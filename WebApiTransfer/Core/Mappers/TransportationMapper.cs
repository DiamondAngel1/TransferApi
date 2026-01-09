using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Models.Transportations;
using Domain.Entities;

namespace Core.Mappers
{
    public class TransportationMapper : Profile
    {
        public TransportationMapper() { 
            CreateMap<TransportationEntity, TransportationItemModel>()
                .ForMember(dest => dest.FromCityName, opt => opt.MapFrom(src => src.FromCity.Name))
                .ForMember(dest => dest.FromCountryName, opt => opt.MapFrom(src => src.FromCity.Country.Name))
                .ForMember(dest => dest.ToCityName, opt => opt.MapFrom(src => src.ToCity.Name))
                .ForMember(dest => dest.ToCountryName, opt => opt.MapFrom(src => src.ToCity.Country.Name))
                .ForMember(dest => dest.DepartureTime, opt => opt.MapFrom(x => x.DepartureTime.ToString("dd.MM.yyyy HH:mm")))
                .ForMember(dest => dest.ArrivalTime, opt => opt.MapFrom(x => x.ArrivalTime.ToString("dd.MM.yyyy HH:mm")))
                .ForMember(dest => dest.StatusName, opt => opt.MapFrom(x => x.Status.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(x => x.Price.ToString("F2")));

            CreateMap<TransportationCreateModel, TransportationEntity>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<TransportationStatusEntity, StatusItemModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));

        }
    }
}
