using Steeltoe.Discovery.Client;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add Steeltoe Discovery Client
builder.Services.AddDiscoveryClient(builder.Configuration);


var app = builder.Build();

// Use Steeltoe Discovery Client
app.UseDiscoveryClient();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseCors(x => x
//        .AllowAnyMethod()
//        .AllowAnyHeader()
//        .SetIsOriginAllowed(origin => true) // allow any origin 
//        .AllowCredentials());

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
