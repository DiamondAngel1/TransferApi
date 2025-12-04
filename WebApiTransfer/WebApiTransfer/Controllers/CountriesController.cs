using Core.Interfaces;
using Core.Models.Location.Country;
using Core.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        public async Task<IActionResult> GetCountries()
        {
            var list = await countryService.GetListAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCountry(int id)
        {
            var item = await countryService.GetByIdAsync(id);
            return Ok(item);
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
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

        [HttpPut("edit")]
        public async Task<IActionResult> UpdateCountry([FromForm] CountryUpdateModel model)
        {
            var item = await countryService.UpdateAsync(model);
            return Ok(item);
        }

    }
}
