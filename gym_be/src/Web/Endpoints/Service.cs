using BackEnd.Domain.Models;
using CleanArchitecture.Application.Service.Commands.delete;
using CleanArchitecture.Application.Service.Commands.Edit;
using CleanArchitecture.Application.Service.Queries.Get;
using CleanArchitecture.Application.Service.Queries.GetPaging;
using CleanArchitecture.Application.Service.Commands.Add;

namespace CleanArchitecture.Web.Endpoints;

public class Service : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this, "service")
            .MapGet(GetService, "get")
            .MapGet(GetPagingService, "get-paging")
            .MapPost(AddService, "add")
            .MapPut(EditService, "edit")
            .MapDelete(DeleteService, "delete");
    }

    public async Task<ResultDto<Application.Service.Queries.Get.GetDtoQuery>> GetService(ISender sender, [AsParameters] GetQuery request)
    {
        return await sender.Send(request);
    }

    public async Task<PagingDto<GetPagingDtoQuery>> GetPagingService(ISender sender, [AsParameters] GetPagingQuery request)
    {
        return await sender.Send(request);
    }


    public async Task<ResultDto> AddService(ISender sender, Application.Service.Commands.Add.AddCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> EditService(ISender sender, EditCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> DeleteService(ISender sender, [AsParameters] DeleteCommand request)
    {
        return await sender.Send(request);
    }
}
