using Domain.Entities.Location;
using Domain;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace WebApiTransfer.Seeders
{
    public static class CitySeeder{
        public static async Task SeedAsync(AppDbTransferContext context, IWebHostEnvironment env)
        {
            if (await context.Cities.AnyAsync()) return;

            var jsonPath = Path.Combine(env.ContentRootPath, "SeedData", "cities.json");
            var imageSourceDir = Path.Combine(env.ContentRootPath, "SeedData", "images");
            var imageTargetDir = Path.Combine(env.ContentRootPath, "Public", "images");

            Directory.CreateDirectory(imageTargetDir);

            var json = await File.ReadAllTextAsync(jsonPath);
            var cities = JsonSerializer.Deserialize<List<CitySeedModel>>(json);

            foreach (var item in cities!)
            {
                var sourceImagePath = Path.Combine(imageSourceDir, item.ImageFileName);
                var targetImagePath = Path.Combine(imageTargetDir, item.ImageFileName);

                if (File.Exists(sourceImagePath))
                    File.Copy(sourceImagePath, targetImagePath, overwrite: true);

                var country = await context.Countries
                    .FirstOrDefaultAsync(c => c.Code == item.CountryCode);
                if (country == null) continue;

                var entity = new CityEntity
                {
                    Name = item.Name,
                    Slug = item.Slug,
                    Image = item.ImageFileName,
                    Description = item.Description,
                    CountryId = country.Id
                };

                context.Cities.Add(entity);
            }

            await context.SaveChangesAsync();
        }

        private class CitySeedModel
        {
            public string Name { get; set; } = null!;
            public string Slug { get; set; } = null!;
            public string? ImageFileName { get; set; }
            public string? Description { get; set; }
            public string CountryCode { get; set; } = null!;
        }
    }
}