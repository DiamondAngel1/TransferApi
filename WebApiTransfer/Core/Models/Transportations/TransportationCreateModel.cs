using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Transportations
{
    public class TransportationCreateModel
    {
        public string Code { get; set; } = string.Empty;
        public int FromCityId { get; set; }
        public int ToCityId { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int SeatsTotal { get; set; }
        public int SeatsAvailable { get; set; }
        public int StatusId { get; set; }
        public float Price { get; set; }
    }
}
