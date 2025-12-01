using AutoMapper;
using Core.Interfaces;
using Core.Models.User;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;


namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IGoogleAccountService googleAccountService) : ControllerBase
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
    }
}
