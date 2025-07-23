namespace CleanArchitecture.Application.Customer.Commands.Delete;

public record DeleteCommand : IRequest<ResultDto>
{
    public required Guid Customerid { get; set; }
}

public class DeleteCommandValidator : AbstractValidator<DeleteCommand>
{
    public DeleteCommandValidator()
    {
        RuleFor(x => x.Customerid).NotEmpty().WithMessage("Không được để trống");
    }
}

public class DeleteCommandHandler(ApplicationDbContext context) : IRequestHandler<DeleteCommand, ResultDto>
{
    
    public async Task<ResultDto> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var query = context.Customers.AsQueryable();

        query = query.Where(x => x.Customerid == request.Customerid);

        var itemDelete = await query.ExecuteDeleteAsync(cancellationToken);

        return new ResultDto
        {
            Data = itemDelete
        };
    }
}
