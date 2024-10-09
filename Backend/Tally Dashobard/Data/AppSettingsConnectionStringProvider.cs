using Tally_Dashobard.Interfaces;

namespace Tally_Dashobard.Data
{
    public class AppSettingsConnectionStringProvider : IConnectionStringProvider
    {
        private readonly IConfiguration _configuration;

        public AppSettingsConnectionStringProvider(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetConnectionString()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }
    }

}
