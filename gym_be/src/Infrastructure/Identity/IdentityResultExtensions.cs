using BackEnd.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Infrastructure.Identity;

public static class IdentityResultExtensions
{
    public static ResultDto ToApplicationResult(this IdentityResult result)
    {
        return new ResultDto();
        //result.Succeeded;
        //? Result.Success()
        //: Result.Failure(result.Errors.Select(e => e.Description));
    }
}
