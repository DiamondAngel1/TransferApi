using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Models.Account;
using Core.Models.User;
using Domain.Entities.Identity;

namespace Core.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<GoogleAccountModel, UserEntity>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(m => m.GoogleId))
                .ForMember(u => u.Email, opt => opt.MapFrom(m => m.Email))
                .ForMember(u => u.FirstName, opt => opt.MapFrom(m => m.FirstName))
                .ForMember(u => u.LastName, opt => opt.MapFrom(m => m.LastName))
                .ForMember(u => u.Image, opt => opt.MapFrom(m => m.PictureUrl))
                .ForMember(u => u.EmailConfirmed, opt => opt.MapFrom(_ => true));
            CreateMap<RegisterModel, UserEntity>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(m => m.Email))
                .ForMember(u => u.Email, opt => opt.MapFrom(m => m.Email))
                .ForMember(u => u.FirstName, opt => opt.MapFrom(m => m.FirstName))
                .ForMember(u => u.LastName, opt => opt.MapFrom(m => m.LastName))
                .ForMember(u => u.PhoneNumber, opt => opt.MapFrom(m => m.PhoneNumber))
                .ForMember(u => u.Image, opt => opt.Ignore());
        }
    }

}
