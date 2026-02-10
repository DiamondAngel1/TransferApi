using System.Text;
using Bogus;
using Core.Interfaces;
using Core.MailSernder;
using Core.Models.Account;
using Core.Services;
using Domain;
using Domain.Entities.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApiTransfer.Filters;
using WebApiTransfer.Seeders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbTransferContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
})
    .AddEntityFrameworkStores<AppDbTransferContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICountryService, CountryService>();

builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IGoogleAccountService, GoogleAccountService>();

builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.AddScoped<ITransportationService, TransportationService>();

builder.Services.AddScoped<ICartService, CartService>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMvc(options =>
{
    options.Filters.Add<ValidationFilter>();
});

builder.Services.AddControllers();

var assemblyName = typeof(LoginModel).Assembly.GetName().Name;
builder.Services.AddSwaggerGen(options =>
{
    var fileDoc = $"{assemblyName}.xml";
    var filePath = Path.Combine(AppContext.BaseDirectory, fileDoc);
    options.IncludeXmlComments(filePath);

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(policy =>
{
    policy.AllowAnyHeader()
          .AllowAnyMethod()
          .AllowAnyOrigin();
});
string dir = Path.Combine(builder.Environment.ContentRootPath, "Public", "Images");
Directory.CreateDirectory(dir);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/images"
}); 

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
    context.Database.Migrate();
    var roles = new[] { "Admin", "User" };
    var roleManager = scope.ServiceProvider
        .GetRequiredService<RoleManager<RoleEntity>>();
    var userManager = scope.ServiceProvider
        .GetRequiredService<UserManager<UserEntity>>();
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new RoleEntity { Name = role });
        }
    }

    //await UserSeeder.SeedAsync(userManager, roleManager, env);
    //int countUsers = 100;
    //var faker = new Faker("uk");
    //for (int i = 0; i < countUsers; i++)
    //{
    //    var firstName = faker.Name.FirstName();
    //    var lastName = faker.Name.LastName();
    //    var email = faker.Internet.Email(firstName, lastName);
    //    var user = new UserEntity
    //    {
    //        UserName = email,
    //        Email = email,
    //        FirstName = firstName,
    //        LastName = lastName,
    //        Image = "default.webp"
    //    };
    //    var userResult = await userManager.CreateAsync(user, "User123");
    //    if (userResult.Succeeded)
    //    {
    //        await userManager.AddToRoleAsync(user, "User");
    //    }
    //}
    await CountrySeeder.SeedAsync(context, env);
    await CitySeeder.SeedAsync(context, env);
    await TrasportationStatusSeeder.SeedAsync(context, env);
    await TransportationSeeder.SeedAsync(context, env);

    //var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();
    //var admins = await userManager.GetUsersInRoleAsync("Admin");

    //foreach (var admin in admins)
    //{
    //    if (!string.IsNullOrEmpty(admin.Email))
    //    {
    //        await emailSender.SendEmailAsync(
    //            admin.Email,
    //            "Сайт успішно запущено",
    //            $"<p>Вітаємо, {admin.UserName}! Сайт запустився.</p>"
    //        );
    //    }
    //}
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var dirImageName = builder.Configuration.GetValue<string>("DirImageName") ?? "imgs";

var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName);
Directory.CreateDirectory(dirImageName);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dirImageName}"
});

app.Run();
