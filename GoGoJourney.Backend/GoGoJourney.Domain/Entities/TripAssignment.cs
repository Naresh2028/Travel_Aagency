using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class TripAssignment
    {
        public Guid Id { get; private set; }
        public Guid TripId { get; private set; }
        public Guid TravellerId { get; private set; }
        public Guid DriverId { get; private set; }
        public TripStatus TripStatus { get; private set; }
        public DateTime AssignedAt { get; private set; }
        public DateTime RespondedAt { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; } 
    }
}
