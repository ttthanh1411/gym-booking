using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class QrBooking
{
    public Guid Qrid { get; set; }

    public bool? Type { get; set; }

    public string? Value { get; set; }

    public bool? Scanned { get; set; }

    public Guid? Customerid { get; set; }

    public virtual Customer? Customer { get; set; }
}
