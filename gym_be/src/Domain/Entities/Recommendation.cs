using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Recommendation
{
    public Guid Rcmid { get; set; }

    public DateTime? Generatedat { get; set; }

    public string? Rcmgoals { get; set; }

    public string? Suggestedcourse { get; set; }

    public DateTime? Peakhouralert { get; set; }

    public Guid? Customerid { get; set; }

    public Guid? Courseid { get; set; }

    public virtual Workoutcourse? Course { get; set; }

    public virtual Customer? Customer { get; set; }
}
