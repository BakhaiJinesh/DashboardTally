using Microsoft.EntityFrameworkCore;
using Tally_Dashobard.DTO;
using Tally_Dashobard.Interfaces;

namespace Tally_Dashobard.Data
{

    public class AppDbContext : DbContext
    {

        private readonly IConfiguration _configuration;
        public string _connectionString = "Server=localhost;Database=accounting;User ID=root;Password=Admin;";

        public DbSet<LoginDTO> users { get; set; }

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString));
            base.OnConfiguring(optionsBuilder);
        }

        /// <summary>
        /// OnModelCreating
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
            //    .HasCharSet("utf8mb4");

            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
        /// <summary>
        /// Configures the options for connecting to the database.
        /// </summary>
        /// <param name="optionsBuilder">The builder used to configure the database options.</param>

    }

}
