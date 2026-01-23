using System;
using System.Collections.Generic;

namespace Owner.models;

public partial class User
{
    public int UserId { get; set; }

    public int? RoleId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    public string? Gender { get; set; }

    public DateOnly? CreatedAt { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<PgProperty> PgProperties { get; set; } = new List<PgProperty>();

    public virtual Role? Role { get; set; }
}
