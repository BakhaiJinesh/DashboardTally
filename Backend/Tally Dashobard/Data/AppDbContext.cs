using Microsoft.EntityFrameworkCore;

namespace Tally_Dashobard.Data
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Define your DbSet properties for your tables
        //public DbSet<YourModel> YourModels { get; set; }
    }

}
