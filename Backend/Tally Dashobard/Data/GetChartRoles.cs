using MySql.Data.MySqlClient;
using System.Configuration;
using System.Data;

namespace Tally_Dashobard.Data
{
    public class GetChartRoles
    {
        private string _connectionString;

        public GetChartRoles(IConfiguration configuration)
        {
            // Connection string for MySQL database
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public DataTable GetChartRolesData(int userid)
        {
            DataTable dataTable = new DataTable();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("CALL GetChartRoles(@userId);", connection))
                    {

                        // Add parameter to command
                        command.Parameters.AddWithValue("@userId", userid);

                        using (MySqlDataAdapter adapter = new MySqlDataAdapter(command))
                        {
                            adapter.Fill(dataTable);
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions (e.g., log the error)
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }

            return dataTable;
        }
    }
}
