using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Common
{
    public interface IDomainEvent
    {
        DateTime OccuredAt { get; }
    }
}
