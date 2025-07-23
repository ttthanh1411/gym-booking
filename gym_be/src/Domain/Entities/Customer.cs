using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Customer
{
    public Guid Customerid { get; set; }

    public string Name { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? Status { get; set; }

    public int? Type { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<QrBooking> QrBookings { get; set; } = new List<QrBooking>();

    public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();

    public virtual ICollection<Workoutcourse> Workoutcourses { get; set; } = new List<Workoutcourse>();
}
