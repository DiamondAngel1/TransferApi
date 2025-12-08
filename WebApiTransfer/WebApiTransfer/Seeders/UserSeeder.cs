using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace WebApiTransfer.Seeders
{
    public static class UserSeeder
    {
        public static async Task SeedAsync(UserManager<UserEntity> userManager,
            RoleManager<RoleEntity> roleManager,
            IWebHostEnvironment env)
        {
            if (await userManager.Users.AnyAsync()) return;



            var jsonPath = Path.Combine(env.ContentRootPath, "SeedData", "users.json");
            var imageSourceDir = Path.Combine(env.ContentRootPath, "SeedData", "images");
            var imageTargetDir = Path.Combine(env.ContentRootPath, "Public", "images");

            Directory.CreateDirectory(imageTargetDir);
            var json = await File.ReadAllTextAsync(jsonPath);
            var users = JsonSerializer.Deserialize<List<UserSeedModel>>(json);

            foreach (var item in users!)
            {
                var sourceImagePath = Path.Combine(imageSourceDir, item.Image);
                var targetImagePath = Path.Combine(imageTargetDir, item.Image);

                if (File.Exists(sourceImagePath))
                    File.Copy(sourceImagePath, targetImagePath, overwrite: true);
                if (!await roleManager.RoleExistsAsync(item.Role))
                {
                    await roleManager.CreateAsync(new RoleEntity(item.Role));
                }
                var user = new UserEntity
                {
                    UserName = item.UserName,
                    Email = item.Email,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    PhoneNumber = item.PhoneNumber,
                    Image = item.Image
                };
                var result = await userManager.CreateAsync(user, item.Password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, item.Role);
                }
            }
        }
        private class UserSeedModel
        {
            public string UserName { get; set; } = null!;
            public string Email { get; set; } = null!;
            public string Password { get; set; } = null!;
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public string? PhoneNumber { get; set; }
            public string? Image { get; set; }
            public string Role { get; set; } = null!;
        }
    }
}
