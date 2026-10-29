using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Common
{
    public record CreateProfileRequestDto(
            string FirstName,
            string LastName,
            string? ProfilePhotoUrl,
            UserAddressDto? updateAddressDto
        );

}
