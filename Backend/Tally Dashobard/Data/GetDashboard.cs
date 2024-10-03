using MySql.Data.MySqlClient;
using System.Data;

namespace Tally_Dashobard.Data
{
    public class GetDashboard
    {
        private string _connectionString;

        public GetDashboard()
        {
            // Connection string for MySQL database
            _connectionString = "Server=localhost;Database=accounting;User ID=root;Password=root;";
        }

        public DataTable GetDashboardData()
        {
            DataTable dataTable = new DataTable();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("CALL GetCompanyData();", connection))
                    {
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
