using System;
using System.Collections.Generic;

namespace Owner.models;

public partial class Room
{
    public int RoomId { get; set; }

    public int? PgId { get; set; }

    public string RoomNo { get; set; } = null!;

    public string? RoomType { get; set; }

    public int? TotalBed { get; set; }

    public int? AvailableBed { get; set; }

    public int? Sharing { get; set; }

    public int? SecurityDeposit { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual PgProperty? Pg { get; set; }
    //public int OwnerId { get; set; }
}
