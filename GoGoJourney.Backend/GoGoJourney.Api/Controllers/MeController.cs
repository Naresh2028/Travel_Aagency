using GoGoJourney.Application.Interfaces.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoGoJourney.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MeController : ControllerBase
    {
        private readonly IUserClaimService _userService;

        public MeController(IUserClaimService userService) 
        {
            _userService = userService;
        }


    }
}
