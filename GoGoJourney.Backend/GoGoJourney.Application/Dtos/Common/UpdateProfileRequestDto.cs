using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Common
{
    public record UpdateProfileRequestDto(
            string FirstName,
            string LastName,
            string? ProfilePhotoUrl,
            UserAddressDto? updateAddressDto
        );
    
}
