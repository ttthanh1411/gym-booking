namespace CleanArchitecture.Application.Schedule.Commands.Add;

public record AddCommand : IRequest<ResultDto>
{
    public Guid Scheduleid { get; set; }

    public string? Dayofweek { get; set; }

    public int? Maxparticipants { get; set; }

    public DateTime? Starttime { get; set; }

    public DateTime? Endtime { get; set; }
}

public class AddCommandValidator : AbstractValidator<AddCommand>
{
    public AddCommandValidator()
    {
    }
}

public class AddCommandHandler(ApplicationDbContext context,IMapper map) : IRequestHandler<AddCommand, ResultDto>
{
    public async Task<ResultDto> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        var modal = map.Map<Entities.Schedule>(request);

        modal.Scheduleid = Guid.NewGuid();

        await context.Schedules.AddAsync(modal);

        await context.SaveChangesAsync(cancellationToken);

        return new ResultDto
        {
            Data = new
            {
                modal.Scheduleid,
                modal.Maxparticipants
            }
        };
    }
}
