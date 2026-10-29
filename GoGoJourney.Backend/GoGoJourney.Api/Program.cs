using GoGoJourney.Application.Common.Mappings;
using GoGoJourney.Application.Common.Options;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Options.Auth;
using GoGoJourney.Application.Services.Auth;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Domain.Interfaces.Common;
using GoGoJourney.Infrastructure.Data;
using GoGoJourney.Infrastructure.External.Email;
using GoGoJourney.Infrastructure.External.Sms;
using GoGoJourney.Infrastructure.Repository.Auth;
using GoGoJourney.Infrastructure.Repository.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;

namespace GoGoJourney.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateBootstrapLogger();

            try
            {
                Log.Information("Starting Server");

                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.

                // Serilog Configuration start

                builder.Services.AddSerilog((services, Ic) => Ic
                        .ReadFrom.Configuration(builder.Configuration)
                        .ReadFrom.Services(services)
                );
                // Serilog Configuration end

                // ==========================================================================================

                // CORS Configuration start

                var origin = builder.Configuration["AllowedOrigin"]!;

                builder.Services.AddCors(option => 
                {
                    option.AddPolicy("MobileApp", policy => 
                    {
                        policy
                            .WithOrigins(origin)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });

                });

                // CORS Configuration end

                // ==========================================================================================

                // Json Serialization conversion start

                builder.Services.AddControllers()
                        .AddJsonOptions(option => 
                        {
                            option.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                        });

                // Json Serialization conversion End

                // ==========================================================================================

                // Auto Mapper configuration start

                builder.Services.AddAutoMapper(option => 
                {
                    option.AddProfile<RegisterMappingProfile>();
                });

                // Auto Mapper configuration end

                // ==========================================================================================

                //  Connection string start
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                                    throw new InvalidOperationException("Connection string was not found");

                builder.Services.AddDbContext<AppDbContext>(option =>
                {
                    option.UseNpgsql(connectionString);
                });

                //  Connection string end

                // ==========================================================================================

                // Resend Configuration (Email Service Package) Start

                builder.Services.AddOptions();

                builder.Services.AddHttpClient<Resend.ResendClient >();

                var apiKey = builder.Configuration["Resend:ApiKey"] ?? 
                    throw new InvalidOperationException("Resent Api key was not found!");

                builder.Services.Configure<Resend.ResendClientOptions>(option => 
                {
                    option.ApiToken = apiKey;
                });

                builder.Services.AddOptions<JwtOptions>()
                    .BindConfiguration(JwtOptions.SectionName);

                // Resend Configuration (Email Service Package) End

                // ==========================================================================================

                // DI Container Start

                //builder.Services.AddTransient<Resend.IResend, Resend.ResendClient>();
                //builder.Services.AddTransient<IEmailService, EmailService>();
                //builder.Services.AddKeyedScoped<IUserClaimRepository, UserClaimRepository>("UserClaim");
                //builder.Services.AddScoped<IJwtService, JwtService>();
                //builder.Services.AddScoped<IPasswordHasher<User>,PasswordHasher<User>>();
                //builder.Services.AddScoped<IUserRepository, UserRepository>();
                //builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

                builder.Services.Configure<OtpOptions>(builder.Configuration.GetSection("Otp"));
                builder.Services.AddScoped<IOtpRepository, OtpRepository>();
                builder.Services.AddScoped<IAuthService, AuthService>();
                builder.Services.AddSingleton<IOtpSender, ConsoleOtpSender>();


                // DI Container End

                // ==========================================================================================

                // Jwt Configuration Start

                var jwtOptions = builder.Configuration
                        .GetSection(JwtOptions.SectionName)
                        .Get<JwtOptions>()
                        ?? throw new InvalidOperationException("JWT configuration was not found!");

                builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer( options => 
                        {
                            options.TokenValidationParameters = new TokenValidationParameters 
                            {
                                ValidateIssuerSigningKey = true,

                                IssuerSigningKey =  new SymmetricSecurityKey(
                                    Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),

                                ValidateIssuer = true,
                                ValidIssuer = jwtOptions.Issuer,

                                ValidateAudience = true,
                                ValidAudience = jwtOptions.Audience,

                                ValidateLifetime = true,
                                ClockSkew = TimeSpan.Zero
                            }; 
                        });

                // Jwt Configuration End

                // ==========================================================================================

                // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
                builder.Services.AddOpenApi();

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    // Generates the raw JSON openapi document at /openapi/v1.json
                    app.MapOpenApi();

                    // Mounts the interactive Scalar UI at /scalar/v1
                    app.MapScalarApiReference();
                }

                //app.UseHttpsRedirection();

                app.UseCors("MobileApp");

                app.UseSerilogRequestLogging();

                app.UseAuthentication();

                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Server Terminated unexpectedly..");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}
