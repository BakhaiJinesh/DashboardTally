using MySql.Data.MySqlClient;
using System.Data;
using System.Text;

namespace Tally_Dashobard.Data
{
    public class ExportFile
    {
        private string _connectionString;

        public ExportFile(IConfiguration configuration)
        {
            // Connection string for MySQL database
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public DataTable FIleDatatable(int userid)
        {
            DataTable dataTable = new DataTable();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("CALL ExportFile(@userId);", connection))
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

        public string ConvertDataTableToCSV(DataTable dataTable)
        {
            StringBuilder csvContent = new StringBuilder();

            // Write the column headers
            for (int i = 0; i < dataTable.Columns.Count; i++)
            {
                csvContent.Append(dataTable.Columns[i].ColumnName);
                if (i < dataTable.Columns.Count - 1)
                {
                    csvContent.Append(",");
                }
            }
            csvContent.AppendLine();

            // Write the data rows
            foreach (DataRow row in dataTable.Rows)
            {
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    csvContent.Append(row[i].ToString());
                    if (i < dataTable.Columns.Count - 1)
                    {
                        csvContent.Append(",");
                    }
                }
                csvContent.AppendLine();
            }

            return csvContent.ToString();
        }
    }
}
