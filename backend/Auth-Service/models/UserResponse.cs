public class UserResponse
{
    public int UserId { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Gender { get; set; } = "";
    public DateOnly? CreatedAt { get; set; }
    public string Status { get; set; } = "";
    public string Role { get; set; } = "";
}
