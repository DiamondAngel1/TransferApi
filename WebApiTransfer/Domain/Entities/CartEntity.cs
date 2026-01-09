using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.Identity;

namespace Domain.Entities
{
    [Table("tblCarts")]
    public class CartEntity
    {
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        [ForeignKey(nameof(Transportation))]
        public int TransportationId { get; set; }
        public short CountTickets { get; set; }
        public virtual UserEntity? User { get; set; }
        public virtual TransportationEntity? Transportation { get; set; }
    }
}
