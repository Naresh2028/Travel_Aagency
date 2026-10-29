using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public sealed record AccessToken(string Value, int ExpiresInSeconds);
    public interface ITokenService
    {
        AccessToken CreateAccessToken(User user);
        (string Token, string Hash) CreateRefreshToken();
        string HashRefreshToken(string token);
    }
}
