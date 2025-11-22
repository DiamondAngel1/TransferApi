using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Location
{
    [Table("tbl_Countries")]
    public class CountryEntity : BaseEntity<int>
    {
        [StringLength(250)]
        public string Name { get; set; } = null!;
        [StringLength(10)]
        public string Code { get; set; } = null!;
        [StringLength(250)]
        public string Slug { get; set; } = null!;
        public string? Image { get; set; }
    }
}
