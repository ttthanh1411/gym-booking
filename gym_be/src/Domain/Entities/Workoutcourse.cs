using System;
using System.Collections.Generic;

namespace BackEnd.Domain.Entities;

public partial class Workoutcourse
{
    public Guid Courseid { get; set; }

    public string? Coursename { get; set; }

    public string? Imageurl { get; set; }

    public Guid? Personaltrainer { get; set; }

    public int? Durationweek { get; set; }

    public string? Description { get; set; }

    public virtual Customer? PersonaltrainerNavigation { get; set; }

    public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
}
