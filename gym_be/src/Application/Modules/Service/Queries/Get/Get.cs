
using AutoMapper;

namespace CleanArchitecture.Application.Service.Queries.Get;

public record GetQuery : IRequest<ResultDto<GetDtoQuery>>
{
    public required Guid Serviceid { get; set; }

}

public class GetQueryValidator : AbstractValidator<GetQuery>
{
    public GetQueryValidator()
    {
        RuleFor(x => x.Serviceid).NotEmpty().WithMessage("Không được để trống");
    }
}

public class GetQueryHandler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<GetQuery, ResultDto<GetDtoQuery>>
{
    public async Task<ResultDto<GetDtoQuery>> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var query = context.Services.AsNoTracking().AsQueryable();

        // where
        query = query.Where(x => x.Serviceid == request.Serviceid);

        // select
        var selectSql = query.ProjectTo<GetDtoQuery>(mapper.ConfigurationProvider);
        // excute query
        return new ResultDto<GetDtoQuery>
        {
            Data = await selectSql.FirstOrDefaultAsync(cancellationToken)
        };
    }
}

public record GetDtoQuery : IMapFrom<Entities.Service>
{
    public Guid Serviceid { get; set; }

    public string? Servicename { get; set; }

    public string? Coursedescription { get; set; }

    public decimal? Serviceprice { get; set; }
}

