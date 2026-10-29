using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Driver
    {
        public Guid Id { get; private set; }
        public Guid AgencyId { get; private set; }
        public Guid? UserId { get; private set; }
        public User User { get; private set; } = null!;
        public Vehicle Vehicle { get; set; } = null!;
        public DrivingLicence DrivingLicence { get; set; } = null!;
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }
    }
}
