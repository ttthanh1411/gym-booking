using CleanArchitecture.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// Add services
//builder.Services.AddKeyVaultIfConfigured(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();

// ✅ NSwag - Add OpenAPI document
builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "Gym API";
    config.Version = "v1"; // bạn có thể thêm version nếu muốn rõ ràng
});

builder.Logging.AddSimpleConsole(options =>
{
    options.IncludeScopes = true;
    options.SingleLine = true;
    options.TimestampFormat = "hh:mm:ss ";
});

var app = builder.Build();
// Áp dụng CORS
app.UseCors("AllowFrontend");
// Middleware
if (app.Environment.IsDevelopment())
{
    // Optional: khởi tạo CSDL
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseHealthChecks("/health");

app.UseExceptionHandler(options => { });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();
app.MapEndpoints();

app.UseOpenApi();      
app.UseSwaggerUi();    

app.Run();
