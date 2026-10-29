using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Common
{
    public interface ICurrentClaimUser
    {
        bool IsAuthenticated { get; }
        Guid UserId { get; }
    }
}
