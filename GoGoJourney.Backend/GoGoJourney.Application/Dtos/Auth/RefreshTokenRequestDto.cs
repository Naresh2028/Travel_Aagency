using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Auth
{
    public class RefreshTokenRequestDto
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
