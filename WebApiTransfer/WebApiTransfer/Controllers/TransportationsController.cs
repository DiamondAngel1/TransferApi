using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TransportationsController(ITransportationService transportationService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await transportationService.GetListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransportation([FromBody] Core.Models.Transportations.TransportationCreateModel model)
        {
            var result = await transportationService.CreateTransportationAsync(model);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetListStatuses()
        {
            var result = await transportationService.GetListStatuses();
            return Ok(result);
        }
    }
}
