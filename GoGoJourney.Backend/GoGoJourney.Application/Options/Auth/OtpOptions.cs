using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Options.Auth
{
    public sealed class OtpOptions
    {
        public string Pepper { get; init; } = default!;
        public int ExpiryMinutes { get; init; } = 5;
        public int ResendCooldownSeconds { get; init; } = 30;
        public int MaxSendsPerHour { get; init; } = 3;
    }
}
