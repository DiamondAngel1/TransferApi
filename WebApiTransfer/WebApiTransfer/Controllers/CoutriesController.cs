using Core.Models.Location;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoutriesController : ControllerBase
    {
        private readonly AppDbTransferContext _context;

        public CoutriesController(AppDbTransferContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCountries()
        {
            var countries = _context.Countries
                .Select(c => new CountryItemModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Code = c.Code,
                    Slug = c.Slug,
                    Image = c.Image
                })
                .ToList();
            return Ok(countries);
        }
    }
}
