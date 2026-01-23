using System;
using System.Collections.Generic;

namespace Tenant.models;

public partial class PgProperty
{
    public int PgId { get; set; }

    public int OwnerId { get; set; }

    public string? PgName { get; set; }

    public string? Description { get; set; }

    public int? Address { get; set; }

    public string? Type { get; set; }

    public int? Rent { get; set; }

    public string? Facility { get; set; }

    public string? Status { get; set; }

    public virtual City? AddressNavigation { get; set; }

    public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual User Owner { get; set; } = null!;

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
