namespace BackEnd.Domain.Interfaces;

public interface IUser
{
    string? Username { get;}

    Task<long?> GetUnitId();

    Task<string?> GetUnitUuid();
}
