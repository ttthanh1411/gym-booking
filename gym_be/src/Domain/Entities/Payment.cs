using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Payment
{
    public Guid Paymentid { get; set; }

    public decimal? Amount { get; set; }

    public bool? Method { get; set; }

    public bool? Status { get; set; }

    public DateTime? Paidat { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
