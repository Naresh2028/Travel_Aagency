using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Enums
{
    public enum AuthFailure
    {
        InvalidPhone,
        TooManyRequests,
        InvalidCode,
        InvalidToken,
        DeliveryFailed
    }
}
