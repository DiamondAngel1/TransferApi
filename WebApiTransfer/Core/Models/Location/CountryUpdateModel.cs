using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Core.Models.Location
{
    public class CountryUpdateModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public IFormFile? Image { get; set; }
    }
}
