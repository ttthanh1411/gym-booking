namespace CleanArchitecture.Application.Schedule.Queries.GetOptions;

public record GetOptionsQuery : OptionModel, IRequest<PagingDto<OptionDto<object>>>
{
}

public class GetOptionsQueryValidator : AbstractValidator<GetOptionsQuery>
{
    public GetOptionsQueryValidator()
    {
    }
}

public class GetOptionsQueryHandler(ApplicationDbContext context) : IRequestHandler<GetOptionsQuery, PagingDto<OptionDto<object>>>
{
    public async Task<PagingDto<OptionDto<object>>> Handle(GetOptionsQuery request, CancellationToken cancellationToken)
    {
        var query = context.Schedules.AsQueryable();

        // where
        if (request.Values.HasValue())
        {
            // where value sẽ không quan tâm điều kiện khác
            var listKey = request.Values!.Split(",");
            query = query.Where(x => listKey.Contains(x.Scheduleid.ToString()));
        }

        // select
        var selectSql = query.Select(x => new OptionDto<object>
        {
            Label = x.Dayofweek,
            Value = x.Scheduleid
        });

        // excute
        return await selectSql.ToPagedListAsync(request, cancellationToken);
    }
}
