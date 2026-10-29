using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Vehicle
    {
        public Guid Id { get; private set; }
        public Guid AgencyId { get; private set; }
        public Guid DrivreId { get; private set; }
        public VehicleType? VehicleType { get; private set; }
        public VehicleCategory? VehicleCategory { get; private set; }

        [Required]
        [RegularExpression(@"^([A-Z]{2}\d{2}[A-Z]{1,3}\d{4})|(\d{2}BH\d{4}[A-Z]{1,2})$",
            ErrorMessage = "Invalid Indian Vehicle Registration Number format.")]
        public string RegistrationNumber { get; private set; } = string.Empty;
        public int SeatCapacity { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

        // Navigation
        public Driver? Driver { get; private set; }
        
    }
}
