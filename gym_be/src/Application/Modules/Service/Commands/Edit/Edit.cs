namespace CleanArchitecture.Application.Service.Commands.Edit;

public record EditCommand : IRequest<ResultDto>
{
  public required Guid Serviceid { get; set; }

}

public record AddCommand : IRequest<ResultDto>, IMapTo<Entities.Service>
{

    public string? Servicename { get; set; }

    public string? Coursedescription { get; set; }

    public decimal? Serviceprice { get; set; }
}

public class EditCommandValidator : AbstractValidator<EditCommand>
{
    public EditCommandValidator()
    {
        RuleFor(x => x.Serviceid).NotEmpty().WithMessage("Không được để trống");

    }
}

public class EditCommandHandler(ApplicationDbContext context) : IRequestHandler<EditCommand, ResultDto>
{
    public async Task<ResultDto> Handle(EditCommand request, CancellationToken cancellationToken)
    {
        var dataOld = await context.Services.FirstAsync(x => x.Serviceid == request.Serviceid);

        context.Services.Entry(dataOld!).CurrentValues.SetValues(request);

        return new ResultDto
        {
            Data = await context.SaveChangesAsync(cancellationToken)
        };
    }
}
