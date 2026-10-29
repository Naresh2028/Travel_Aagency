using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Trip
    {
        public Guid Id { get; private set; }
        public Guid AgencyId { get; private set; }
        public Guid TravellerId { get; private set; }
        public string Pickup { get; private set; } = string.Empty;
        public string Destination { get; private set; } = string.Empty;
        public DateTime PickupAtUtc { get; private set; }
        public int PassengerCount { get; private set; }
        public TripStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

    }
}
