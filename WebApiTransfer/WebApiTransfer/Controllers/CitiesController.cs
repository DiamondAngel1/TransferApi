using Core.Interfaces;
using Core.Models.Location;
using Core.Models.Location.Country;
using Core.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController(ICityService cityService) 
        : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var list = await cityService.GetListAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCity(int id)
        {
            var item = await cityService.GetByIdAsync(id);
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCity([FromForm] CityCreateModel model)
        {
            var item = await cityService.CreateAsync(model);
            return CreatedAtAction(null, item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var item = await cityService.DeleteAsync(id);
            return Ok(item);
        }
    }
}
