using System;
using System.Collections.Generic;

namespace Tenant.models;

public partial class City
{
    public int CityId { get; set; }

    public string? CityName { get; set; }

    public int? Sid { get; set; }

    public virtual ICollection<PgProperty> PgProperties { get; set; } = new List<PgProperty>();

    public virtual State? SidNavigation { get; set; }
}
