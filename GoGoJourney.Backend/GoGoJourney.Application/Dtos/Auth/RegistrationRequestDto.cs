using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Auth
{
    public class RegistrationRequestDto
    {
        public RegistrationIdentityType IdentityType { get; set; }
        public string IdentityValue { get; set; } = string.Empty;
    }
}
