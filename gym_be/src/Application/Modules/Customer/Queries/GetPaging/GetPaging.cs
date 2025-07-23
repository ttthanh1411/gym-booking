using BackEnd.Domain.Models;
using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.Customer.Queries.GetPaging;

public record GetPagingQuery : IRequest<PagingDto<object>>
{
}

public class GetPagingQueryValidator : AbstractValidator<GetPagingQuery>
{
    public GetPagingQueryValidator()
    {
    }
}

public class GetPagingQueryHandler : IRequestHandler<GetPagingQuery, PagingDto<object>>
{
    private readonly IApplicationDbContext _context;

    public GetPagingQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagingDto<object>> Handle(GetPagingQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
