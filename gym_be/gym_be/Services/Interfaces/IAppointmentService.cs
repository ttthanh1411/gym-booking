using gym_be.Models.DTOs;

namespace gym_be.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<AppointmentDto> GetAppointmentByIdAsync(string appointmentId);
        Task<IEnumerable<AppointmentDto>> GetAllAppointmentsAsync(int page, int pageSize);
        Task<IEnumerable<AppointmentDto>> SearchAppointmentsAsync(string searchQuery);
        Task<AppointmentDto> AddAppointmentAsync(AppointmentDto appointmentDto);
        Task<AppointmentDto> UpdateAppointmentAsync(string appointmentId, AppointmentDto appointmentDto);
        Task<bool> DeleteAppointmentAsync(string appointmentId);
    }
}
