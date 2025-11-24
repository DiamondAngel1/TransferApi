using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Location;

namespace Core.Interfaces
{
    public interface ICountryService
    {
        Task<List<CountryItemModel>> GetListAsync();
        Task<CountryItemModel> CreateAsync(CountryCreateModel model);
        Task<CountryItemModel> DeleteAsync(int id);
    }
}
