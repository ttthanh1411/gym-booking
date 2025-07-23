using BackEnd.Domain.Models;
using CleanArchitecture.Application.Customer.Commands.Add;
using CleanArchitecture.Application.Customer.Commands.Delete;
using CleanArchitecture.Application.Customer.Commands.Edit;
using CleanArchitecture.Application.Customer.Queries.Get;
using CleanArchitecture.Application.Customer.Queries.GetPaging;
using CleanArchitecture.Web.Infrastructure;
using Microsoft.AspNetCore.Builder;

namespace CleanArchitecture.Web.Endpoints;

public class Customer : EndpointGroupBase
{

    public override void Map(WebApplication app)
    {
        app.MapGroup(this, "customer")
            .MapGet(GetCustomer, "get")
            .MapGet(GetPagingCustomer, "get-paging")
            .MapPost(AddCustomer, "add")
            .MapPut(EditCustomer, "edit")
            .MapDelete(DeleteCustomer, "delete");
    }

    public async Task<ResultDto<GetDtoQuery>> GetCustomer(ISender sender, [AsParameters] GetQuery request)
    {
        return await sender.Send(request);
    }

    public async Task<PagingDto<GetPagingDtoQuery>> GetPagingCustomer(ISender sender, [AsParameters] GetPagingQuery request)
    {
        return await sender.Send(request);
    }


    public async Task<ResultDto> AddCustomer(ISender sender, AddCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> EditCustomer(ISender sender, EditCommand request)
    {
        return await sender.Send(request);
    }

    public async Task<ResultDto> DeleteCustomer(ISender sender, [AsParameters] DeleteCommand request)
    {
        return await sender.Send(request);
    }
}
