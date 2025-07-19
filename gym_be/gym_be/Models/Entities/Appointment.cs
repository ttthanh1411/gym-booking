using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace gym_be.Models.Entities
{
    public class Appointment
    {
        [Key]
        public string AppointmentId { get; set; }

        public string AppointmentName { get; set; }

        public DateTime AppointmentDate { get; set; }

        public DateTime AppointmentTime { get; set; }

        [Column(TypeName = "numeric(10,2)")]
        public decimal Price { get; set; }

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public string ScheduleId { get; set; }
        public Schedule Schedule { get; set; }

        public string ServiceId { get; set; }
        public Service Service { get; set; }

        public bool Status { get; set; }
    }
}
