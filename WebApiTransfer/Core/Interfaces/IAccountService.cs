using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Account;
using Core.Models.Search;
using Domain.Entities.Identity;

namespace Core.Interfaces
{
    public interface IAccountService
    {
        Task<(UserEntity user, string token)> RegisterAsync(RegisterModel model);
        Task<string> LoginAsync(LoginModel model);
        Task<UserEntity> GetUserAsync(ClaimsPrincipal principal);
        Task<UserProfileModel> GetUserProfileAsync();
        public Task<bool> ForgotPasswordAsync(ForgotPasswordModel model);
        public Task<bool> ResetPasswordAsync(ResetPasswordModel model);
        public Task<SearchResult<UserItemModel>> SearchAsync(UserSearchModel model);
    }
}
