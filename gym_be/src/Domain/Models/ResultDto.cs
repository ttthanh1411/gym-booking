namespace BackEnd.Domain.Models;
public class ResultDto
{
    public object? Data { get; set; }
}

public class ResultDto<T>
{
    public T? Data { get; set; }
}

public class ResultsDto
{
    public List<object>? Items { get; set; }
}

public class ResultsDto<T>
{
    public List<T>? Items { get; set; }
}
