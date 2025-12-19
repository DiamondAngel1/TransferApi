using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Account;
using Domain;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Core.Services
{
    public class AccountService(UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager,
        AppDbTransferContext transferContext,
        IJwtTokenService jwtTokenService,
        IEmailSender emailSender,
        IConfiguration configuration,
        IImageService imageService,
        IAuthService authService,
        IMapper mapper) : IAccountService
    {
        public async Task<(UserEntity user, string token)> RegisterAsync(RegisterModel model)
        {
            var entity = mapper.Map<UserEntity>(model);
            if (model.Image != null)
            {
                entity.Image = await imageService.UploadImageAsync(model.Image);
            }
            else
            {
                entity.Image = "default-user.png";
            }
            var result = await userManager.CreateAsync(entity, model.Password);
            if (!result.Succeeded)
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new RoleEntity("User"));
            }
            await userManager.AddToRoleAsync(entity, "User");
            var token = await jwtTokenService.CreateAsync(entity);

            return (entity, token);
        }

        public async Task<string> LoginAsync(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return null;

            var isPasswordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
                return null;

            var token = await jwtTokenService.CreateAsync(user);
            return token;
        }

        public async Task<UserEntity?> GetUserAsync(ClaimsPrincipal principal)
        {
            var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (email == null)
                return null;
            return await userManager.FindByEmailAsync(email);
        }

        public async Task<UserProfileModel> GetUserProfileAsync()
        {
            var userId = await authService.GetUserIdAsync();

            var profile = await transferContext.Users
                .ProjectTo<UserProfileModel>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(u => u.Id == userId!);
            return profile!;
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null){
                return false;
            }

            string token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = $"{configuration["ClientUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";

            await emailSender.SendEmailAsync(model.Email, "Змінити пароль", $"<p>Click the link below to reset your password:</p><a href='{resetLink}'>Reset Password</a>");

            return true;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
                if (!result.Succeeded)
                {
                    return false;
                }
            }
            var password = model.NewPassword;
            var confirmPassworsd = model.ConfirmPassword;
            if (confirmPassworsd != password) {

                return false;
            }
            
            return true;
        }
    }
}
