namespace CleanArchitecture.Application.Schedule.Commands.Delete;

public record DeleteCommand : IRequest<ResultDto>
{
    public Guid Scheduleid { get; set; }
}

public class DeleteCommandValidator : AbstractValidator<DeleteCommand>
{
    public DeleteCommandValidator()
    {
    }
}

public class DeleteCommandHandler(ApplicationDbContext context,IMapper map) : IRequestHandler<DeleteCommand, ResultDto>
{
   
    public async Task<ResultDto> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var query = context.Schedules.AsQueryable();

        query = query.Where(x => x.Scheduleid == request.Scheduleid);

        var itemDelete = await query.ExecuteDeleteAsync(cancellationToken);

        return new ResultDto
        {
            Data = itemDelete
        };
    }
}
