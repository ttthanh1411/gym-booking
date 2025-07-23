using System.Text.Json.Serialization;

namespace BackEnd.Domain.Models;

public class Response<T>
{
    /// <summary>
    /// Request's result data
    /// </summary>
    public required T Data { get; set; }

    /// <summary>
    /// Request's result exception (if there's any)
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Errors { get; set; }

    /// <summary>
    /// Response code
    /// </summary>
    public required string Code { get; set; }
}
