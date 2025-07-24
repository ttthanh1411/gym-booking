namespace CleanArchitecture.Application.Customer.Commands.Edit;

public record EditCommand : IRequest<ResultDto>
{
    public Guid Customerid { get; set; }

    public string Name { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? Type { get; set; }

    public int? Status { get; set; }
}

public class EditCommandValidator : AbstractValidator<EditCommand>
{
    public EditCommandValidator()
    {
        RuleFor(x => x.Customerid).NotEmpty().WithMessage("Không được để trống");
    }
}

public class EditCommandHandler(ApplicationDbContext context) : IRequestHandler<EditCommand, ResultDto>
{
    public async Task<ResultDto> Handle(EditCommand request, CancellationToken cancellationToken)
    {
        var dataOld = await context.Customers.FirstAsync(x => x.Customerid == request.Customerid);

        context.Customers.Entry(dataOld!).CurrentValues.SetValues(request);

        return new ResultDto
        {
            Data = await context.SaveChangesAsync(cancellationToken)
        };
    }
}
