using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Domain.Entities;

[Table("qr_booking")]
public partial class qr_booking
{
    [Key]
    public Guid qrid { get; set; }

    public bool? type { get; set; }

    [StringLength(256)]
    public string? value { get; set; }

    public bool? scanned { get; set; }

    public Guid? customerid { get; set; }

    [ForeignKey("customerid")]
    [InverseProperty("qr_bookings")]
    public virtual customer? customer { get; set; }
}
