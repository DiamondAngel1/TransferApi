using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Core.Models.Location;
using Domain;
using Domain.Entities.Location;
using Microsoft.EntityFrameworkCore;

namespace Core.Services
{
    public class CountryService(AppDbTransferContext context, 
        IImageService imageService,
        IMapper mapper) : ICountryService
    {
        public async Task<CountryItemModel> GetByIdAsync(int id)
        {
            var entity = await context.Countries.FindAsync(id);
            if (entity == null || entity.IsDeleted)
            {
                throw new Exception("Country not found");
            }

            var item = mapper.Map<CountryItemModel>(entity);
            return item;
        }

        public async Task<List<CountryItemModel>> GetListAsync()
        {
            var list = await context.Countries
                .Select(c => new CountryItemModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Code = c.Code,
                    Slug = c.Slug,
                    Image = c.Image
                })
                .ToListAsync();
            return list;
        }


        public async Task<CountryItemModel> CreateAsync(CountryCreateModel model)
        {
            var entity = mapper.Map<CountryEntity>(model);
            if (model.Image != null)
            {
                entity.Image = await imageService.UploadImageAsync(model.Image);
            }
            await context.Countries.AddAsync(entity);
            await context.SaveChangesAsync();
            var item = mapper.Map<CountryItemModel>(entity);
            return item;
        }

        public async Task<CountryItemModel> DeleteAsync(int id)
        {
            var entity = await context.Countries.FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Country not found");
            }
            entity.IsDeleted = true;
            context.Countries.Update(entity);
            await context.SaveChangesAsync();
            var item = mapper.Map<CountryItemModel>(entity);
            return item;
        }
        public async Task<CountryItemModel> UpdateAsync(int id, CountryUpdateModel model)
        {
            var entity = await context.Countries.FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Country not found");
            }

            mapper.Map(model, entity);

            if (model.Image != null)
            {
                if (!string.IsNullOrEmpty(entity.Image))
                {
                    await imageService.DeleteImageAsync(entity.Image);
                }
                entity.Image = await imageService.UploadImageAsync(model.Image);
            }

            await context.SaveChangesAsync();

            var item = mapper.Map<CountryItemModel>(entity);
            return item;
        }



    }
}
