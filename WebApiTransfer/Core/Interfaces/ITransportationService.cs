using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Transportations;

namespace Core.Interfaces
{
    public interface ITransportationService
    {
        Task<List<TransportationItemModel>> GetListAsync();
        Task<TransportationItemModel> CreateTransportationAsync(TransportationCreateModel model);
        Task<List<StatusItemModel>> GetListStatuses();
    }
}
