using System.ComponentModel.DataAnnotations;

namespace Tally_Dashobard.DTO
{
    public class LoginDTO
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
