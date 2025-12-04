using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Account;
using Domain.Entities.Identity;

namespace Core.Interfaces
{
    public interface IAccountService
    {
        Task<(UserEntity user, string token)> RegisterAsync(RegisterModel model);
        Task<string> LoginAsync(LoginModel model);
        Task<UserEntity> GetUserAsync(ClaimsPrincipal principal);
    }
}
