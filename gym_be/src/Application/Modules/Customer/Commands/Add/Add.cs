namespace CleanArchitecture.Application.Customer.Commands.Add;

public record AddCommand : IRequest<ResultDto>, IMapTo<Entities.Customer>
{
    public string Name { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? Status { get; set; }

    public int? Type { get; set; }
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

        modal.Customerid = Guid.NewGuid();

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
