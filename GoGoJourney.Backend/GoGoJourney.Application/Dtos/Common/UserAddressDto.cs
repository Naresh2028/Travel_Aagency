using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Common
{
    public record UserAddressDto(
        string AddressLine1,
        string? AddressLine2,
        string City,
        string State,
        string PostalCode,
        string Country
        );
    
}
