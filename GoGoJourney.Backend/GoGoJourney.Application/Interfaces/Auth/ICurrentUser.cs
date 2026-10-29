using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public interface ICurrentUser
    {
        Guid UserId { get; }
        Role Role { get; }
    }
}
