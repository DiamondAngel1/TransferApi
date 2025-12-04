using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.Identity;

namespace Core.Interfaces
{
    public interface IJwtTokenService
    {
        Task<string> CreateAsync(UserEntity user);
    }
}
