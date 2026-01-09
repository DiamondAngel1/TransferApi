using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Cart;

namespace Core.Interfaces
{
    public interface ICartService
    {
        Task AddUpdateCartAsync(CartAddUpdateModel model);
        Task<List<CartItemModel>> GetListAsync();
    }
}
