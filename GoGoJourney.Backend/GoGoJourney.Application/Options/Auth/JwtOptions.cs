using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Options
{
    public sealed class JwtOptions
    {
        public string Issuer { get; init; } = "skylimit-api";
        public string Audience { get; init; } = "skylimit-app";
        public string SecretKey { get; init; } = default!;

        // Why {get;init;} instead of {get;set;}
        public int AccessTokenMinutes { get; init; } = 15;
        public int RefreshTokenDays { get; init; } = 30;
    }
}
