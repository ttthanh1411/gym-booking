using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Service
{
    public Guid Serviceid { get; set; }

    public string? Servicename { get; set; }

    public string? Coursedescription { get; set; }

    public decimal? Serviceprice { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Appointment> AppointmentsNavigation { get; set; } = new List<Appointment>();
}
