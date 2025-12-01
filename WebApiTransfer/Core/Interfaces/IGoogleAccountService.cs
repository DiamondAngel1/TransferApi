using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.User;
using Domain.Entities.Identity;

namespace Core.Interfaces
{
    public interface IGoogleAccountService
    {
        Task<UserEntity> LoginByGoogleAsync(GoogleLoginRequestModel model);
        Task<JwtSecurityToken> ValidateGoogleTokenAsync(string idToken, string clientId);
        Task<IList<string>> GetUserRolesAsync(UserEntity user);
    }
}
