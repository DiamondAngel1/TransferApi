using Core.Interfaces;
using Core.Models.Cart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartService cartService) : ControllerBase
    {
        [HttpGet("getCart")]
        public async Task<IActionResult> GetList()
        {
            var result = await cartService.GetListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddUpdate([FromBody] CartAddUpdateModel model)
        {
            await cartService.AddUpdateCartAsync(model);
            return Ok();
        }

    }
}
