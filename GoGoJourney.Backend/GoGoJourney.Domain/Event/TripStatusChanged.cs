using GoGoJourney.Domain.Enums;
using GoGoJourney.Domain.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Event
{
    /// <summary>
    /// Raised on every trip transition. The Application layer dispatches it after SaveChanges
    /// and creates Notification rows (push first) from it - the Trip never knows about notifications.
    /// </summary>
    public sealed record TripStatusChanged(
            Guid TripId,
            Guid AgencyId,
            Guid TravellerId,
            Guid? DriverId,
            TripStatus TripStatus,
            Guid ActorUserId,
            DateTime OccuredAt
             ) : IDomainEvent;
}
