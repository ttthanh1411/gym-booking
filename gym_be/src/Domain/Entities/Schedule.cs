using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Schedule
{
    public Guid Scheduleid { get; set; }

    public string? Dayofweek { get; set; }

    public int? Maxparticipants { get; set; }

    public DateTime? Starttime { get; set; }

    public DateTime? Endtime { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
