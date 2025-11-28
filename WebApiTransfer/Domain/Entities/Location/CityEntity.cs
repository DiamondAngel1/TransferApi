using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Location
{
    [Table("tbl_city")]
    public class CityEntity : BaseEntity<int>
    {
        [StringLength(250)]
        public string Name { get; set; } = null!;

        [StringLength(250)]
        public string Slug { get; set; } = null!;

        public string? Image { get; set; }

        public string? Description { get; set; }

        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }

        public CountryEntity Country { get; set; } = null!;
    }
}
