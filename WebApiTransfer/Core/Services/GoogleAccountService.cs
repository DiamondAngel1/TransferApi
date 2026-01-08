using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Core.Models.User;
using Domain.Entities.Identity;
using MailKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;

namespace Core.Services
{
    public class GoogleAccountService(
        UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager,
        IConfiguration configuration,
        IImageService imageService,
        IJwtTokenService jwtTokenService,
        IMapper mapper) : IGoogleAccountService
    {
        public async Task<string> LoginByGoogleAsync(string accessToken)
        {
            using var httpClient = new HttpClient();

            var userInfoUrl = $"https://www.googleapis.com/oauth2/v3/userinfo?access_token={accessToken}";
            var response = await httpClient.GetAsync(userInfoUrl);

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);

            if (googleUser == null || googleUser.Email == null)
                return null;

            var existingUser = await userManager.FindByEmailAsync(googleUser.Email);

            if (existingUser != null)
            {
                var login = await userManager.FindByLoginAsync("Google", googleUser.GoogleId);

                if (login == null)
                {
                    await userManager.AddLoginAsync(existingUser,
                        new UserLoginInfo("Google", googleUser.GoogleId, "Google"));
                }

                return await jwtTokenService.CreateAsync(existingUser);
            }

            var newUser = mapper.Map<UserEntity>(googleUser);

            if (!string.IsNullOrEmpty(googleUser.PictureUrl))
            {
                newUser.Image = await imageService.SaveImageFromUrlAsync(googleUser.PictureUrl);
            }

            var result = await userManager.CreateAsync(newUser);

            if (!result.Succeeded)
                return null;

            await userManager.AddLoginAsync(newUser,
                new UserLoginInfo("Google", googleUser.GoogleId, "Google"));

            await userManager.AddToRoleAsync(newUser, "User");

            return await jwtTokenService.CreateAsync(newUser);
        }


        public async Task<JwtSecurityToken> ValidateGoogleTokenAsync(string idToken, string clientId)
        {
            var handler = new JwtSecurityTokenHandler();
            var httpClient = new HttpClient();
            var keys = await httpClient.GetFromJsonAsync<JsonWebKeySet>("https://www.googleapis.com/oauth2/v3/certs");

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "https://accounts.google.com",
                ValidateAudience = true,
                ValidAudience = clientId,
                ValidateLifetime = true,
                IssuerSigningKeys = keys.Keys
            };
            handler.ValidateToken(idToken, validationParameters, out var validatedToken);
            return (JwtSecurityToken)validatedToken;
        }

        public async Task<IList<string>> GetUserRolesAsync(UserEntity user)
        {
            return await userManager.GetRolesAsync(user);
        }
    }
}
