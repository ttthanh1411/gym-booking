namespace BackEnd.Application.Interfaces;

public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(ResultDto Result, string UserId)> CreateUserAsync(string userName, string password);

    Task<ResultDto> DeleteUserAsync(string userId);
}
