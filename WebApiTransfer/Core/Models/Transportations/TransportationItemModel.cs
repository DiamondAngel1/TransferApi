using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Transportations
{
    public class TransportationItemModel
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string FromCityName { get; set; } = string.Empty;
        public string FromCountryName { get; set; } = string.Empty;
        public string ToCityName { get; set; } = string.Empty;
        public string ToCountryName { get; set; } = string.Empty;
        public string DepartureTime { get; set; } = string.Empty;
        public string ArrivalTime { get; set; } = string.Empty;
        public int SeatsTotal { get; set; }
        public int SeatsAvailable { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
    }
}
