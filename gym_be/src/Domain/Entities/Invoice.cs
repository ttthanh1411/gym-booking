using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Invoice
{
    public Guid Invoiceid { get; set; }

    public Guid? Paymentid { get; set; }

    public decimal? Total { get; set; }

    public string? Detail { get; set; }

    public DateTime? Issuedate { get; set; }

    public Guid? Appointmentid { get; set; }

    public virtual Appointment? Appointment { get; set; }

    public virtual Payment? Payment { get; set; }
}
