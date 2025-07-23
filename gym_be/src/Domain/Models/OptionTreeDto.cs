namespace BackEnd.Domain.Models;

public class OptionTreeDto<T> : OptionDto<T>
{
    public long Id { get; set; }
    public string? Parent { get; set; }

    public bool? IsLeaf { get; set; }

    public decimal? Level { get; set; }

    public string? Path { get; set; }

    public bool? IsBonus { get; set; }

    public byte? IsGroup { get; set; }
}
