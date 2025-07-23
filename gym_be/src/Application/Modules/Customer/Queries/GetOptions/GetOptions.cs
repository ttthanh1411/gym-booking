using BackEnd.Domain.Models;
using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.Customer.Queries.GetOptions;

public record GetOptionsQuery : IRequest<PagingDto<OptionDto<object>>>
{
}

public class GetOptionsQueryValidator : AbstractValidator<GetOptionsQuery>
{
    public GetOptionsQueryValidator()
    {
    }
}

public class GetOptionsQueryHandler : IRequestHandler<GetOptionsQuery, PagingDto<OptionDto<object>>>
{
    private readonly IApplicationDbContext _context;

    public GetOptionsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagingDto<OptionDto<object>>> Handle(GetOptionsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
