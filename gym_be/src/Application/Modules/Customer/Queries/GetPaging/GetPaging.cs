namespace CleanArchitecture.Application.Customer.Queries.GetPaging;

public record GetPagingQuery : PagingModel, IRequest<PagingDto<GetPagingDtoQuery>>
{
    public string? Q { get; set; }
}

public class GetPagingQueryValidator : AbstractValidator<GetPagingQuery>
{
    public GetPagingQueryValidator()
    {
    }
}

public class GetPagingQueryHandler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<GetPagingQuery, PagingDto<GetPagingDtoQuery>>
{

    public async Task<PagingDto<GetPagingDtoQuery>> Handle(GetPagingQuery request, CancellationToken cancellationToken)
    {
        var query = context.Customers.AsNoTracking().AsQueryable();

        // where
        if (request.Q.HasValue())
        {
            var qsearch = request.Q!.ToUnSign();
            query = query.Where(x => x.Name.ToString().Contains(qsearch));
        }

        // order by
        query = query.OrderBy(x => x.Name);

        // select
        var selectSql = query.ProjectTo<GetPagingDtoQuery>(mapper.ConfigurationProvider);

        // excute query
        return await selectSql.ToPagedListAsync(request, cancellationToken);
    }
}

public record GetPagingDtoQuery : IMapFrom<Entities.Customer>
{
    public Guid Customerid { get; set; }

    public string Name { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public int? Status { get; set; }

    public string Password { get; set; } = null!;
    public int? Type { get; set; }

}
