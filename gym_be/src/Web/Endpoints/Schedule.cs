using BackEnd.Domain.Models;
using CleanArchitecture.Application.Schedule.Commands.Delete;
using CleanArchitecture.Application.Schedule.Commands.Edit;
using CleanArchitecture.Application.Schedule.Queries.Get;
using CleanArchitecture.Application.Schedule.Queries.GetPaging;
using CleanArchitecture.Application.Schedule.Commands.Add;

namespace CleanArchitecture.Web.Endpoints;

public class Schedule : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this, "Schedule")
            .MapGet(Get, "get")
            .MapGet(GetPaging, "get-paging")
            .MapPost(Add, "add")
            .MapPut(Edit, "edit")
            .MapDelete(Delete, "delete");
    }

    public async Task<ResultDto<GetDtoQuery>> Get(ISender sender, [AsParameters] GetQuery request)
    {
        return await sender.Send(request);
    }

    public async Task<PagingDto<GetPagingDtoQuery>> GetPaging(ISender sender, [AsParameters] GetPagingQuery request)
    {
        return await sender.Send(request);
    }


    public async Task<ResultDto> Add(ISender sender, Application.Service.Commands.Add.AddCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> Edit(ISender sender, EditCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> Delete(ISender sender, [AsParameters] DeleteCommand request)
    {
        return await sender.Send(request);
    }
}
