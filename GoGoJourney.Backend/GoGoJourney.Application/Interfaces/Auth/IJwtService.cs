using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public interface IJwtService
    {
        (string Token,DateTime ExpiresAt) GenerateRegistrationToken(Guid registrationId);
        Guid ValidateRegistrationToken(string token);
        (string Token, DateTimeOffset ExpiresAt) GenerateAccessToken(User user);
        (string Token, DateTimeOffset ExpiresAt) GenerateRefreshToken();
    }
}
