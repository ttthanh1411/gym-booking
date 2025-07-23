namespace CleanArchitecture.Application.Service.Commands.Add;

public record AddCommand : IRequest<ResultDto>, IMapTo<Entities.Service>
{

    public string? Servicename { get; set; }

    public string? Coursedescription { get; set; }

    public decimal? Serviceprice { get; set; }
}

public class AddCommandValidator : AbstractValidator<AddCommand>
{
    public AddCommandValidator()
    {
        RuleFor(x => x.Servicename).NotEmpty().WithMessage("Không được để trống");
    }
}

public class AddCommandHandler(ApplicationDbContext context, IMapper map) : IRequestHandler<AddCommand, ResultDto>
{
    public async Task<ResultDto> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        var modal = map.Map<Entities.Service>(request);

        modal.Serviceid = Guid.NewGuid();

        await context.Services.AddAsync(modal);

        await context.SaveChangesAsync(cancellationToken);

        return new ResultDto
        {
            Data = new
            {
                modal.Serviceid,
                modal.Servicename
            }
        };
    }

}
