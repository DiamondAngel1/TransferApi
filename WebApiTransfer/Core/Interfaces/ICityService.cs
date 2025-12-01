using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Location.City;
using Core.Models.Location.Country;

namespace Core.Interfaces
{
    public interface ICityService
    {
        Task<CityItemModel> GetByIdAsync(int id);
        Task<List<CityItemModel>> GetListAsync();
        Task<CityItemModel> CreateAsync(CityCreateModel model);
        Task<CityItemModel> DeleteAsync(int id);
    }
}
