using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Core.Interfaces;
using Core.Models.Account;
using Core.Models.User;
using Core.Services;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;


namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IGoogleAccountService googleAccountService,
        UserManager<UserEntity> userManager,
        IJwtTokenService jwtTokenService,
        IImageService imageService,
        IAccountService accountService,
        IMapper mapper) : ControllerBase
    {
        [HttpPost("googleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
        {
            var user = await googleAccountService.LoginByGoogleAsync(model);
            var roles = await googleAccountService.GetUserRolesAsync(user);
            return Ok(new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Image,
                Roles = roles
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var token = await accountService.LoginAsync(model);
            if (token == null)
            {
                return BadRequest(new
                {
                    errors = new
                    {
                        Email = new[] { "Invalid email or password" },
                        Password = new[] { "Invalid email or password" }
                    }
                });
            }

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            var (user, token) = await accountService.RegisterAsync(model);
            
            return Ok(new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Image,
                Roles = new[] {"User"},
                Token = token
            });
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user = await accountService.GetUserAsync(User);
            if (user == null)
                return Unauthorized();
            var roles = await userManager.GetRolesAsync(user);

            return Ok(new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Image,
                Roles = roles
            });

        }
    }
}
