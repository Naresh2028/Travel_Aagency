using GoGoJourney.Application.Exceptions;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoGoJourney.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authservice;
        public AuthController(IAuthService authservice) 
        {
            _authservice = authservice;
        }
        public sealed record RequestOtpRequest(string phoneNumber);
        
        [HttpPost("otp/request")]
        public async Task<IActionResult> RequestOtp(RequestOtpRequest request, CancellationToken ct) 
        {
            try
            {
                return Ok(await _authservice.RequestOtpAsync(request.phoneNumber, ct));
            }
            catch (AuthException ex)
            {
                var status = ex.Failure == AuthFailure.TooManyRequests
                    ? StatusCodes.Status429TooManyRequests
                    : StatusCodes.Status400BadRequest;
                return Problem(detail: ex.Message, statusCode: status);
            }
        }
       
    }
}
