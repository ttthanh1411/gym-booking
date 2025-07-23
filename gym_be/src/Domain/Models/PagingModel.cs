namespace BackEnd.Domain.Models;
public record PagingModel : IPagingModel
{
    public int? Page { get; set; }
    public int? Size { get; set; }

    public int? Count { get; set; }

    //public string? OrderBy { get; set; }

    //[JsonIgnore]
    //public Dictionary<string, bool>? OrderByObject
    //{
    //    get
    //    {
    //        if (!OrderBy.HasValue()) return null;

    //        try
    //        {
    //            var objValue = OrderBy!.Split(',');
    //            var result = new Dictionary<string, bool>();
    //            foreach (var item in objValue)
    //            {
    //                var keyValue = item.Split(' ');
    //                result.Add(keyValue[0], keyValue[1].ToLower() == "asc");
    //            }
    //            return result;
    //        }
    //        catch (Exception)
    //        {
    //            throw new ValidationException("Tham số OrderBy Không đúng định dạng");
    //        }
    //    }
    //}

    public bool? Countable { get; set; }

    public bool? HasNextPage { get; set; }
}
