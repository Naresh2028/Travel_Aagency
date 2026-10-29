using GoGoJourney.Application.Interfaces.Common;
using System.Security.Claims;

namespace GoGoJourney.Api.Security
{
    public class CurrentUser(IHttpContextAccessor accessor) : ICurrentClaimUser
    {
        private ClaimsPrincipal? principal => accessor.HttpContext?.User;

        bool ICurrentClaimUser.IsAuthenticated => principal?.Identity?.IsAuthenticated == true;

        public Guid UserId =>
            Guid.TryParse(accessor.HttpContext?.User.FindFirst("sub")?.Value, out var id) ?
            id : 
            throw new InvalidOperationException("No Authenticated User");

    }
}
