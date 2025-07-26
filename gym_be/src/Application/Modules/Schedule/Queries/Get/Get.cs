using AutoMapper;

namespace CleanArchitecture.Application.Schedule.Queries.Get;

public record GetQuery : IRequest<ResultDto<GetDtoQuery>>
{
    public Guid Scheduleid { get; set; }
}

public class GetQueryValidator : AbstractValidator<GetQuery>
{
    public GetQueryValidator()
    {
    }
}

public class GetQueryHandler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<GetQuery, ResultDto<GetDtoQuery>>
{
    public async Task<ResultDto<GetDtoQuery>> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var query = context.Schedules.AsNoTracking().AsQueryable();

        // where
        query = query.Where(x => x.Scheduleid == request.Scheduleid);

        // select
        var selectSql = query.ProjectTo<GetDtoQuery>(mapper.ConfigurationProvider);

        // excute query
        return new ResultDto<GetDtoQuery>
        {
            Data = await selectSql.FirstOrDefaultAsync(cancellationToken)
        };
    }
}

public record GetDtoQuery : IMapFrom<Entities.Schedule>
{
    public Guid Scheduleid { get; set; }

    public string? Dayofweek { get; set; }

    public int? Maxparticipants { get; set; }

    public DateTime? Starttime { get; set; }

    public DateTime? Endtime { get; set; }
}
