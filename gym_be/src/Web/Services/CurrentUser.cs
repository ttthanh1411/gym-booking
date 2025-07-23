using System.Security.Claims;
using BackEnd.Domain.Interfaces;
namespace CleanArchitecture.Web.Services;

public class CurrentUser : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? Id => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? Username => throw new NotImplementedException();

    public Task<long?> GetUnitId()
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetUnitUuid()
    {
        throw new NotImplementedException();
    }
}
