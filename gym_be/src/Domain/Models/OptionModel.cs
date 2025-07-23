using System.Text.Json.Serialization;

namespace BackEnd.Domain.Models;
public record OptionModel : IPagingModel
{
    public string? Q { get; set; }

    public string? Values { get; set; }

    public int? Page { get; set; }

    public int? Size { get; set; }

    public int? Count { get; set; }

    public string? OrderBy { get; set; }

    public bool? Countable { get; set; } = true;
}
