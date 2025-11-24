using Core.Interfaces;
using Core.Models.Location;
using Core.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController(ICountryService countryService) 
        : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCountries()
        {
            var list = await countryService.GetListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry([FromForm] CountryCreateModel model)
        {
            var item = await countryService.CreateAsync(model);
            return CreatedAtAction(null, item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var item = await countryService.DeleteAsync(id);
            return Ok(item);
        }
    }
}
