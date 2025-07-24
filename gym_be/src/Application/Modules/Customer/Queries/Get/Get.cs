namespace CleanArchitecture.Application.Customer.Queries.Get;

public record GetQuery : IRequest<ResultDto<GetDtoQuery>>
{
    public required Guid Customerid { get; set; }
}

public class GetQueryValidator : AbstractValidator<GetQuery>
{
    public GetQueryValidator()
    {
        RuleFor(x => x.Customerid).NotEmpty().WithMessage("Không được để trống");
    }
}

public class GetQueryHandler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<GetQuery, ResultDto<GetDtoQuery>>
{
    public async Task<ResultDto<GetDtoQuery>> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var query = context.Customers.AsNoTracking().AsQueryable();

        // where
        query = query.Where(x => x.Customerid == request.Customerid);

        // select
        var selectSql = query.ProjectTo<GetDtoQuery>(mapper.ConfigurationProvider);
        // excute query
        return new ResultDto<GetDtoQuery>
        {            
            Data = await selectSql.FirstOrDefaultAsync(cancellationToken)
        };
    }
}

public record GetDtoQuery : IMapFrom<Entities.Customer>
{
    public Guid Customerid { get; set; }
    public string Name { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? Status { get; set; }

    public int? Type { get; set; }
}
