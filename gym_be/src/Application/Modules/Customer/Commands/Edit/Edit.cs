using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.Customer.Commands.Edit;

public record EditCommand : IRequest<ResultDto>
{
    public Guid Customerid { get; set; }
}

public class EditCommandValidator : AbstractValidator<EditCommand>
{
    public EditCommandValidator()
    {
    }
}

public class EditCommandHandler : IRequestHandler<EditCommand, ResultDto>
{
    private readonly IApplicationDbContext _context;

    public EditCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResultDto> Handle(EditCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
