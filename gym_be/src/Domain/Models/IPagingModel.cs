namespace BackEnd.Domain.Models;
public interface IPagingModel
{
    int? Page { get; set; }
    int? Size { get; set; }
    //string? OrderBy { get; set; }
    bool? Countable { get; set; }
}
