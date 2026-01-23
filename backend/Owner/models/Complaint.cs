using System;
using System.Collections.Generic;

namespace Owner.models;

public partial class Complaint
{
    public int ComplaintId { get; set; }

    public int? TenantId { get; set; }

    public int? PgId { get; set; }

    public string? Message { get; set; }

    public string? Status { get; set; }

    public DateTime? ComplaintAt { get; set; }

    public virtual PgProperty? Pg { get; set; }

    public virtual User? Tenant { get; set; }
}
