using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Appointment
{
    public Guid Appointmentid { get; set; }

    public string? Appointmentname { get; set; }

    public DateOnly? Appointmentdate { get; set; }

    public TimeOnly? Appointmenttime { get; set; }

    public decimal? Price { get; set; }

    public Guid? Customerid { get; set; }

    public Guid? Scheduleid { get; set; }

    public Guid? Serviceid { get; set; }

    public int? Status { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public virtual Schedule? Schedule { get; set; }

    public virtual Service? Service { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
