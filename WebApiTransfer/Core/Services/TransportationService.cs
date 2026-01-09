using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Transportations;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services
{
    public class TransportationService(
        AppDbTransferContext appDbContext,
        IMapper mapper) : ITransportationService
    {
        public async Task<List<TransportationItemModel>> GetListAsync()
        {
            var result = await appDbContext.Transportations
                .ProjectTo<TransportationItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();

            return result;
        }
        public async Task<TransportationItemModel> CreateTransportationAsync(TransportationCreateModel model)
        {
            var entity = mapper.Map<TransportationEntity>(model);
            await appDbContext.Transportations.AddAsync(entity);
            await appDbContext.SaveChangesAsync();
            var item = await appDbContext.Transportations
                .Where(t => t.Id == entity.Id)
                .ProjectTo<TransportationItemModel>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            return item!;
        }
        public async Task<List<StatusItemModel>> GetListStatuses()
        {
            var result = await appDbContext.TransportationStatuses
                .ProjectTo<StatusItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();
            return result;
        }
    }
}