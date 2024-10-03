using Microsoft.AspNetCore.Mvc;
using System.Data;
using Tally_Dashobard.Data;

namespace Tally_Dashobard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly GetDashboard _dashboardDataAccess;

        public HomeController(GetDashboard dashboardDataAccess)
        {
            _dashboardDataAccess = dashboardDataAccess;
        }

        [HttpGet]
        public IActionResult GetYourModels()
        {
            DataTable dashboardData = _dashboardDataAccess.GetDashboardData();

            // Convert DataTable to a dynamic list or an array
            var result = new List<Dictionary<string, object>>();

            foreach (DataRow row in dashboardData.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn column in dashboardData.Columns)
                {
                    dict[column.ColumnName] = row[column];
                }
                result.Add(dict);
            }

            // Return the result as JSON
            return Ok(result);
        }
    }
}
