namespace BackEnd.Domain.Models;
public class PagingDto<T>
{
    public List<T>? Items { get; set; }

    public PagingModel? Meta { get; set; }
}
