using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Transportations;

namespace Core.Models.Cart
{
    public class CartItemModel : TransportationItemModel
    {
        public short Quantity { get; set; }
    }
}
