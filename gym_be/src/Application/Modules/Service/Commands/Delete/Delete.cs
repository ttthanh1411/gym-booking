using CleanArchitecture.Application.Customer.Commands.Delete;

namespace CleanArchitecture.Application.Service.Commands.delete;

public record DeleteCommand : IRequest<ResultDto>
{
    public required Guid Serviceid { get; set; }

}

public class DeleteCommandValidator : AbstractValidator<DeleteCommand>
{
    public DeleteCommandValidator()
    {
        RuleFor(x => x.Serviceid).NotEmpty().WithMessage("Không được để trống");
    }
}

public class DeleteCommandHandler(ApplicationDbContext context) : IRequestHandler<DeleteCommand, ResultDto>
{

    public async Task<ResultDto> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var query = context.Services.AsQueryable();

        query = query.Where(x => x.Serviceid == request.Serviceid);

        var itemDelete = await query.ExecuteDeleteAsync(cancellationToken);

        return new ResultDto
        {
            Data = itemDelete
        };
    }
}

