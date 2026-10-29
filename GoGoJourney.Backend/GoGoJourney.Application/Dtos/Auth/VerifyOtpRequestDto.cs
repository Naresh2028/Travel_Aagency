using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Auth
{
    public class VerifyOtpRequestDto
    {
        public Guid RegistrationId { get; set; }
        public string Otp { get; set; } = string.Empty;
    }
}
