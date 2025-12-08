using Domain.Entities;
using Domain;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace WebApiTransfer.Seeders
{
    public static class TransportationSeeder
    {
        public static async Task SeedAsync(AppDbTransferContext context, IWebHostEnvironment env)
        {
            if (await context.Transportations.AnyAsync()) return;

            var jsonPath = Path.Combine(env.ContentRootPath, "SeedData", "transportations.json");
            var json = await File.ReadAllTextAsync(jsonPath);
            var transportations = JsonSerializer.Deserialize<List<TransportationSeedModel>>(json);

            foreach (var item in transportations!)
            {
                var fromCity = await context.Cities.FirstOrDefaultAsync(c => c.Slug == item.FromCitySlug);
                var toCity = await context.Cities.FirstOrDefaultAsync(c => c.Slug == item.ToCitySlug);
                var status = await context.TransportationStatuses.FirstOrDefaultAsync(s => s.Name == item.StatusName);

                if (fromCity == null || toCity == null || status == null) continue;

                var entity = new TransportationEntity
                {
                    Code = item.Code,
                    FromCityId = fromCity.Id,
                    ToCityId = toCity.Id,
                    DepartureTime = DateTime.SpecifyKind(item.DepartureTime, DateTimeKind.Utc),
                    ArrivalTime = DateTime.SpecifyKind(item.ArrivalTime, DateTimeKind.Utc),
                    SeatsTotal = item.SeatsTotal,
                    SeatsAvailable = item.SeatsAvailable,
                    StatusId = status.Id
                };

                context.Transportations.Add(entity);
            }

            await context.SaveChangesAsync();
        }

        private class TransportationSeedModel
        {
            public string Code { get; set; } = null!;
            public string FromCitySlug { get; set; } = null!;
            public string ToCitySlug { get; set; } = null!;
            public DateTime DepartureTime { get; set; }
            public DateTime ArrivalTime { get; set; }
            public int SeatsTotal { get; set; }
            public int SeatsAvailable { get; set; }
            public string StatusName { get; set; } = null!;
        }
    }
}
