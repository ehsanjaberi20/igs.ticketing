using IGS.Ticketing.Service.Business;
using IGS.Ticketing.Service.Middelware;
using IGS.Ticketing.Service.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddBusinessLayer(builder.Configuration.GetConnectionString("DefaultConnection")!);

builder.Services.AddControllers();


builder.Services.AddCustomValidators();

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

// Add authentication
//builder.Services.AddIdentity<AppUser, IdentityRole>();
//builder.Services.AddScoped<IPermissionService, PermissionService>();

builder.Services.AddMemoryCache();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:4000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            //ValidateLifetime = true,
            //ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (context.Request.Cookies.ContainsKey("AuthToken"))
                {
                    context.Token = context.Request.Cookies["AuthToken"];
                }
                return Task.CompletedTask;
            }
        };
    });
//builder.Services.AddCors(options => {
//    options.AddPolicy("Open", builder=>builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
//});
// Add authorization
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseCors("AllowFrontend");
//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();


app.MapControllers();


//Database
//string connString = configuration.GetConnectionString("DefaultConnection")!;

app.Run();
