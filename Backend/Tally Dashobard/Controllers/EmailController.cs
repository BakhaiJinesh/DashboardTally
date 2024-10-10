using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Tally_Dashobard.Data;
using Tally_Dashobard.DTO;


namespace Tally_Dashobard.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ExportFile _exportFile;

        public EmailController(ExportFile exportFile) 
        {
            _exportFile = exportFile;
            // Passowrd for smtp udzh yxcv trub qofi
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest emailRequest)
        {
            if (string.IsNullOrEmpty(emailRequest.Email))
            {
                return BadRequest("Email is required.");
            }

            try
            {
                // Generate the DataTable based on AccessID
                DataTable dashboardData = _exportFile.FIleDatatable(emailRequest.AccessID);

                // Convert the DataTable to CSV
                string csvContent = _exportFile.ConvertDataTableToCSV(dashboardData);

                // Set the content type and the file name
                var csvBytes = Encoding.UTF8.GetBytes(csvContent);

                // Create a memory stream to hold the CSV data
                using (var memoryStream = new MemoryStream(csvBytes))
                {
                    // Create the attachment from the memory stream
                    var attachment = new Attachment(memoryStream, "Report " + DateTime.Now.ToString("yyyy-MM-dd") + ".csv", "text/csv");

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("jineshbakhai59@gmail.com"),
                        Subject = "Chart Shared",
                        Body = "The chart has been shared with you!",
                        IsBodyHtml = true,
                    };

                    mailMessage.To.Add(emailRequest.Email);
                    mailMessage.Attachments.Add(attachment); // Attach the CSV file

                    // Send the email
                    using (var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential("jineshbakhai59@gmail.com", "udzh yxcv trub qofi"), // Use app password
                        EnableSsl = true,
                    })
                    {
                        await smtpClient.SendMailAsync(mailMessage);
                    }
                }

                return Ok("Email sent successfully.");
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP Error: {smtpEx.Message}");
                return StatusCode(500, $"SMTP error: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}