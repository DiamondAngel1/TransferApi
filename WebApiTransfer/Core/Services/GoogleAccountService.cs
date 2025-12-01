using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Core.Models.User;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;

namespace Core.Services
{
    public class GoogleAccountService(
        UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager,
        IMapper mapper) : IGoogleAccountService
    {
        public async Task<UserEntity> LoginByGoogleAsync(GoogleLoginRequestModel model)
        {
            //також тут можна було б не створювати ще одного метода
            //а просто викоритсати бібліотеку Google.Apis.Auth і її метод ValidateAsync

            var jwt = await ValidateGoogleTokenAsync(model.IdToken, "334276158389-94cate7sf5jbeta7thb2k96h6vrf94c6.apps.googleusercontent.com");
            Console.WriteLine(JsonSerializer.Serialize(jwt.Claims.Select(c => new { c.Type, c.Value })));

            var googleUser = new GoogleAccountModel
            {
                GoogleId = jwt.Claims.First(c => c.Type == "sub").Value,
                Email = jwt.Claims.First(c => c.Type == "email").Value,
                FirstName = jwt.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value ?? "",
                LastName = jwt.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value ?? "",
                PictureUrl = jwt.Claims.FirstOrDefault(c => c.Type == "picture")?.Value ?? ""
            };

            var user = await userManager.FindByEmailAsync(googleUser.Email);
            if (user == null)
            {
                user = mapper.Map<UserEntity>(googleUser);

                var result = await userManager.CreateAsync(user);
                if (!result.Succeeded)
                    throw new Exception("Створення користувача невдале");

                if (!await roleManager.RoleExistsAsync("User"))
                {
                    await roleManager.CreateAsync(new RoleEntity("User"));
                }
                await userManager.AddToRoleAsync(user, "User");
            }
            var login = await userManager.FindByLoginAsync("Google", googleUser.GoogleId);
            if (login == null)
            {
                await userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUser.GoogleId, "Google"));
            }
            return user;
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
