namespace CleanArchitecture.Application.Service.Queries.GetOptions;

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
        var query = context.Services.AsQueryable();

        // where
        if (request.Values.HasValue())
        {
            // where value sẽ không quan tâm điều kiện khác
            var listKey = request.Values!.Split(",");
            query = query.Where(x => listKey.Contains(x.Serviceid.ToString()));
        }

        // select
        var selectSql = query.Select(x => new OptionDto<object>
        {
            Label = x.Servicename,
            Value = x.Serviceid
        });

        // excute
        return await selectSql.ToPagedListAsync(request, cancellationToken);
    }
}
