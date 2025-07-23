namespace CleanArchitecture.Application.Customer.Commands.Add;

public record AddCommand : IRequest<ResultDto>, IMapTo<Entities.Customer>
{
    public string Name { get; set; } = null!;
}

public class AddCommandValidator : AbstractValidator<AddCommand>
{
    public AddCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Không được để trống");
    }
}

public class AddCommandHandler(ApplicationDbContext context, IMapper map) : IRequestHandler<AddCommand, ResultDto>
{
   
    public async Task<ResultDto> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        var modal = map.Map<Entities.Customer>(request);


        await context.Customers.AddAsync(modal);

        await context.SaveChangesAsync(cancellationToken);

        return new ResultDto
        {
            Data = new
            {
                modal.Customerid,
                modal.Name
            }
        };
    }
}
