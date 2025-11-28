using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Models.Location.Country;
using Domain.Entities.Location;

namespace Core.Mappers
{
    public class CountryMapper : Profile
    {
        public CountryMapper()
        {
            CreateMap<CountryEntity, CountryItemModel>();
            CreateMap<CountryCreateModel, CountryEntity>()
                .ForMember(x=>x.Image, opt=>opt.Ignore());
            CreateMap<CountryUpdateModel, CountryEntity>()
                .ForMember(x => x.Image, opt => opt.Ignore());

        }
    }
}
