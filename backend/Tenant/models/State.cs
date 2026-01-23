using System;
using System.Collections.Generic;

namespace Tenant.models;

public partial class State
{
    public int Sid { get; set; }

    public string? Sname { get; set; }

    public virtual ICollection<City> Cities { get; set; } = new List<City>();
}
