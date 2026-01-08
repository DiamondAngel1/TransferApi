using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
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
using Microsoft.IdentityModel.Tokens;


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
            var result = await googleAccountService.LoginByGoogleAsync(model.IdToken);
            if (string.IsNullOrEmpty(result))
            {
                return BadRequest(new
                {
                    Status = 400,
                    IsValid = false,
                    Errors = new { Email = "Помилка реєстрації" }
                });
            }
            return Ok(new
            {
                Token = result
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

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var model = await accountService.GetUserProfileAsync();
            return Ok(model);
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var result = await accountService.ForgotPasswordAsync(model);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new
                {
                    status = 400,
                    IsValid = false,
                    errors = new
                    {
                        Email = new[] { "Email not found" }
                    }
                });
            }
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var result = await accountService.ResetPasswordAsync(model);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new
                {
                    status = 400,
                    IsValid = false,
                    errors = new
                    {
                        Token = new[] { "Invalid token or email" }
                    }
                });
            }
        }

        [HttpGet("Search")]
        public async Task<IActionResult> SearchUsers([FromQuery] UserSearchModel model)
        {
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            var result = await accountService.SearchAsync(model);
            stopwatch.Stop();
            TimeSpan ts = stopwatch.Elapsed;
            string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:00}",
                ts.Hours, ts.Minutes, ts.Seconds,
                ts.Milliseconds / 10);
            Console.WriteLine("---------RunTime----------: " + elapsedTime);
            return Ok(result);
        }
    }
}
