using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Common
{
    public record ProfileResponseDto(
            Guid ProfileId,
            Guid UserId,
            Role Role,
            string FirstName,
            string LastName,
            string? ProfilePhotoUrl,
            UserAddressDto? UpdateAddressDto,
            bool IsActive,
            bool IsCompleted
        );
}
