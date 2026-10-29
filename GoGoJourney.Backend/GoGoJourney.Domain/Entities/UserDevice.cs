using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGoJourney.Domain.Entities
{
    public class UserDevice
    {
        [Key]
        public Guid Id { get; private set; } = Guid.NewGuid();

        [Required]
        public string UserId { get; private set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string DeviceToken { get; private set; } = string.Empty;

        // Platform Breakdown for Targeting (e.g., "android", "ios")
        [Required]
        [MaxLength(50)]
        public string Platform { get; private set; } = string.Empty;

        [MaxLength(100)]
        public string? DeviceName { get; private set; } 

        [MaxLength(50)]
        public string? AppVersion { get; private set; } 
        public bool IsActive { get; private set; } = true;
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime ModifiedAt { get; private set; } = DateTime.UtcNow;

    }
}
