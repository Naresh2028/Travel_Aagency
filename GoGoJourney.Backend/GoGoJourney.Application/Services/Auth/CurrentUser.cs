using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Domain.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace GoGoJourney.Application.Services.Auth
{
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor _httpContext;

        public CurrentUser(IHttpContextAccessor httpContext) 
        {
            _httpContext = httpContext;
        }

        public Guid UserId
        {
            get 
            {
                var value = _httpContext.HttpContext?
                             .User
                             .FindFirst(ClaimTypes.NameIdentifier)?.Value;

                return Guid.Parse(value!);
            }
        }

        public Role Role 
        {
            get 
            {
                var value = _httpContext.HttpContext?
                            .User
                            .FindFirst(ClaimTypes.Role)?.Value;

                return Enum.Parse<Role>(value!);
            }
        }
    }
}
