using System;
using System.Collections.Generic;

namespace Tenant.models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? TenantId { get; set; }

    public int? PgId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public virtual PgProperty? Pg { get; set; }

    public virtual User? Tenant { get; set; }
}
