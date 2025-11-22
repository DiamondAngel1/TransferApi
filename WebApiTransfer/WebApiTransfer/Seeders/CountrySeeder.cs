using System.Text.Json;
using Domain;
using Domain.Entities.Location;
using Microsoft.EntityFrameworkCore;

namespace WebApiTransfer.Seeders;

public static class CountrySeeder
{
    public static async Task SeedAsync(AppDbTransferContext context, IWebHostEnvironment env)
    {
        if (await context.Countries.AnyAsync()) return;

        var jsonPath = Path.Combine(env.ContentRootPath, "SeedData", "countries.json");
        var imageSourceDir = Path.Combine(env.ContentRootPath, "SeedData", "images");
        var imageTargetDir = Path.Combine(env.ContentRootPath, "Public", "images");

        Directory.CreateDirectory(imageTargetDir);

        var json = await File.ReadAllTextAsync(jsonPath);
        var countries = JsonSerializer.Deserialize<List<CountrySeedModel>>(json);

        foreach (var item in countries!)
        {
            var sourceImagePath = Path.Combine(imageSourceDir, item.ImageFileName);
            var targetImagePath = Path.Combine(imageTargetDir, item.ImageFileName);

            if (File.Exists(sourceImagePath))
                File.Copy(sourceImagePath, targetImagePath, overwrite: true);

            var entity = new CountryEntity
            {
                Name = item.Name,
                Code = item.Code,
                Slug = item.Slug,
                Image = item.ImageFileName
            };

            context.Countries.Add(entity);
        }

        await context.SaveChangesAsync();
    }

    private class CountrySeedModel
    {
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string ImageFileName { get; set; } = null!;
    }
}