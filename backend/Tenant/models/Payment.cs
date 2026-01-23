using System;
using System.Collections.Generic;

namespace Tenant.models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? BookingId { get; set; }

    public int? Amount { get; set; }

    public string? PaymentMode { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual Booking? Booking { get; set; }
}
