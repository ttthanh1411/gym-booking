using BackEnd.Domain.Models;
using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.Customer.Queries.Get;

public record GetQuery : IRequest<ResultDto<object>>
{
}

public class GetQueryValidator : AbstractValidator<GetQuery>
{
    public GetQueryValidator()
    {
    }
}

public class GetQueryHandler : IRequestHandler<GetQuery, ResultDto<object>>
{
    private readonly IApplicationDbContext _context;

    public GetQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResultDto<object>> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
