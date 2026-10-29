using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Auth
{
    public class VerifyOtpResponseDto
    {
        public string RegistrationToken { get; set; } = string.Empty;
        public DateTime RegistrationTokenExpiresAt { get; set; }
    }
}
