using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Core.Models.Location.Country
{
    public class CountryCreateModel
    {
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
    }
}
