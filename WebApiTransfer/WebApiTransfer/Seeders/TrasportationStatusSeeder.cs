using Domain.Entities;
using Domain;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace WebApiTransfer.Seeders
{
    public static class TrasportationStatusSeeder
    {
        public static async Task SeedAsync(AppDbTransferContext context, IWebHostEnvironment env)
        {
            if (await context.TransportationStatuses.AnyAsync()) return;

            var jsonPath = Path.Combine(env.ContentRootPath, "SeedData", "transportationStatuses.json");
            var json = await File.ReadAllTextAsync(jsonPath);
            var statuses = JsonSerializer.Deserialize<List<StatusSeedModel>>(json);

            foreach (var item in statuses!)
            {
                var entity = new TransportationStatusEntity
                {
                    Name = item.Name
                };

                context.TransportationStatuses.Add(entity);
            }

            await context.SaveChangesAsync();
        }

        private class StatusSeedModel
        {
            public string Name { get; set; } = null!;
        }
    }
}
