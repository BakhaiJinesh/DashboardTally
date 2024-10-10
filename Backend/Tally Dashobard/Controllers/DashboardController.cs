using Microsoft.AspNetCore.Mvc;
using System.Data;
using Tally_Dashobard.Data;
using Tally_Dashobard.DTO;

namespace Tally_Dashobard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly GetDashboard _dashboardDataAccess;
        private readonly LoginDetails _loginDetails;
        private readonly GetChartRoles _chartRoles;

        public DashboardController(GetDashboard dashboardDataAccess, LoginDetails loginDetails, GetChartRoles chartRoles)
        {
            _dashboardDataAccess = dashboardDataAccess;
            _loginDetails = loginDetails;
            _chartRoles = chartRoles;
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult LoginStatus(LoginDTO loginDTO)
        {
            string username = loginDTO.UserName;
            string password = loginDTO.Password;

            var result = _loginDetails.LoginDetailsStatus(username, password);



            // Return the result as JSON
            return Ok(result);
        }


        [HttpGet]
        [Route("GetDashboard")]
        public IActionResult GetDashboardData(int userid)
        {
            DataTable dashboardData = _dashboardDataAccess.GetDashboardData(userid);

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


        [HttpGet]
        [Route("GetChartRoles")]
        public IActionResult GetChartRolesData(int userid)
        {
            DataTable dashboardData = _chartRoles.GetChartRolesData(userid);

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
