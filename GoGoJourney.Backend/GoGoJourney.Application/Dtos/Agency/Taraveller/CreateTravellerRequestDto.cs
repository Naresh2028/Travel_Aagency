using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Agency.Taraveller
{
    public class CreateTravellerRequestDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
    }
}
