namespace CleanArchitecture.Application.Schedule.Queries.GetPaging;

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
        var query = context.Schedules.AsNoTracking().AsQueryable();

        // where
        if (request.Q.HasValue())
        {
            var qsearch = request.Q!.ToUnSign();
            query = query.Where(x => x.Dayofweek.ToString().Contains(qsearch));
        }

        // select
        var selectSql = query.ProjectTo<GetPagingDtoQuery>(mapper.ConfigurationProvider);

        // excute query
        return await selectSql.ToPagedListAsync(request, cancellationToken);
    }
}
public record GetPagingDtoQuery : IMapFrom<Entities.Schedule>
{
    public Guid Scheduleid { get; set; }

    public string? Dayofweek { get; set; }

    public int? Maxparticipants { get; set; }

    public DateTime? Starttime { get; set; }

    public DateTime? Endtime { get; set; }
}
