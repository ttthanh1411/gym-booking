namespace CleanArchitecture.Application.Service.Queries.GetPaging;

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
        var query = context.Services.AsNoTracking().AsQueryable();

        // where
        if (request.Q.HasValue())
        {
            var qsearch = request.Q!.ToUnSign();
            query = query.Where(x => x.Servicename.ToString().Contains(qsearch));
        }

        // order by
        query = query.OrderBy(x => x.Servicename);

        // select
        var selectSql = query.ProjectTo<GetPagingDtoQuery>(mapper.ConfigurationProvider);

        // excute query
        return await selectSql.ToPagedListAsync(request, cancellationToken);
    }
}

public record GetPagingDtoQuery : IMapFrom<Entities.Service>
{
    public Guid Serviceid { get; set; }

    public string? Servicename { get; set; }

    public string? Coursedescription { get; set; }

    public decimal? Serviceprice { get; set; }
}
