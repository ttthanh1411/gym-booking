namespace BackEnd.Domain.Models;

public class OptionDto<T>
{
    public T? Value { get; set; }
    public string? Label { get; set; }

    public string? Group { get; set; }
}
