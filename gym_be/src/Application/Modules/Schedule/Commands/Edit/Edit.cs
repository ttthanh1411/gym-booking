namespace CleanArchitecture.Application.Schedule.Commands.Edit;

public record EditCommand : IRequest<ResultDto>
{
    public Guid Scheduleid { get; set; }

    public string? Dayofweek { get; set; }

    public int? Maxparticipants { get; set; }

    public DateTime? Starttime { get; set; }

    public DateTime? Endtime { get; set; }
}

public class EditCommandValidator : AbstractValidator<EditCommand>
{
    public EditCommandValidator()
    {
    }
}

public class EditCommandHandler(ApplicationDbContext context, IMapper map) : IRequestHandler<EditCommand, ResultDto>
{
    public async Task<ResultDto> Handle(EditCommand request, CancellationToken cancellationToken)
    {
        var dataOld = await context.Schedules.FirstOrDefaultAsync(x => x.Scheduleid == request.Scheduleid, cancellationToken);

        if (dataOld == null)
            throw new NotFoundException(nameof(Schedule), request.Scheduleid.ToString());

        context.Schedules.Entry(dataOld!).CurrentValues.SetValues(request);

        return new ResultDto
        {
            Data = await context.SaveChangesAsync(cancellationToken)
        };
    }
}
