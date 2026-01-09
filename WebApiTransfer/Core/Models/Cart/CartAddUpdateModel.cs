using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Cart
{
    public class CartAddUpdateModel
    {
        public int TransportationId { get; set; }
        public short Quantity { get; set; }
    }
}
