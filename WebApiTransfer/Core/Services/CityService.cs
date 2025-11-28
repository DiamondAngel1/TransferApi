using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location;
using Core.Models.Location.City;
using Core.Models.Location.Country;
using Domain;
using Domain.Entities.Location;
using Microsoft.EntityFrameworkCore;

namespace Core.Services
{
    public class CityService(AppDbTransferContext context, 
        IImageService imageService,
        IMapper mapper) : ICityService
    {
        public async Task<CityItemModel> GetByIdAsync(int id)
        {
            var entity = await context.Cities.FindAsync(id);
            if (entity == null || entity.IsDeleted)
            {
                throw new Exception("Country not found");
            }

            var item = mapper.Map<CityItemModel>(entity);
            return item;
        }

        public async Task<List<CityItemModel>> GetListAsync()
        {
            var list = await context.Cities
                .ProjectTo<CityItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();
            return list;
        }


        public async Task<CityItemModel> CreateAsync(CityCreateModel model)
        {
            var entity = mapper.Map<CityEntity>(model);
            if (model.Image != null)
            {
                entity.Image = await imageService.UploadImageAsync(model.Image);
            }
            await context.Cities.AddAsync(entity);
            await context.SaveChangesAsync();
            var city = await context.Cities
                .ProjectTo<CityItemModel>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == entity.Id);
            var item = mapper.Map<CityItemModel>(entity);
            return item;
        }

        public async Task<CityItemModel> DeleteAsync(int id)
        {
            var entity = await context.Cities.FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Country not found");
            }
            entity.IsDeleted = true;
            context.Cities.Update(entity);
            await context.SaveChangesAsync();
            var item = mapper.Map<CityItemModel>(entity);
            return item;
        }
    }
}
