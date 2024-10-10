using Microsoft.EntityFrameworkCore;
using System.Configuration;
using Tally_Dashobard.Data;
using Tally_Dashobard.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://127.0.0.1:5500")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddScoped<GetDashboard>();
builder.Services.AddScoped<LoginDetails>();
builder.Services.AddScoped<GetChartRoles>();
builder.Services.AddSingleton<IConnectionStringProvider, AppSettingsConnectionStringProvider>();



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigin"); // Use CORS policy

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
