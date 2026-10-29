using System;
using System.Collections.Generic;
using System.Runtime;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Agency
    {
        private Agency() { }

        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

        // Navigation
        public User User { get; private set; } = null!;

        public static Agency Create(Guid userId, string name) 
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Userid is required", nameof(userId));

            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("name is required",nameof(name));

            return new Agency 
            {
                Id = Guid.CreateVersion7(),
                UserId = userId,
                Name = name.Trim(),
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
