using MySql.Data.MySqlClient;
using System.Data;

namespace Tally_Dashobard.Data
{
    public class LoginDetails
    {
        private string _connectionString;
        private readonly AppDbContext appDbContext;

        public LoginDetails(AppDbContext appDbContext)
        {
            // Connection string for MySQL database
            _connectionString = "Server=localhost;Database=accounting;User ID=root;Password=Admin;";
            this.appDbContext = appDbContext; 
        }

        public string LoginDetailsStatus(string username,string password) 
        { 
            string result = "Invalid User";
            
            
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var user = appDbContext.users
                              .FirstOrDefault(user => user.UserName == username && user.Password == password);

                    if (user != null)
                    {
                        result = user.UserID.ToString(); // Assuming UserID is what you want to return on success
                    }

                }
                catch (Exception ex)
                {
                    // Handle exceptions (e.g., log the error)
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }

            return result;
        }
    }
}
