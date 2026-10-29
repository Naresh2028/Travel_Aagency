using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Traveller
    {
        private Traveller() { }

        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

        public static Traveller Create(Guid userId) 
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId is required", nameof(userId));

            return new Traveller 
            {
                Id = Guid.CreateVersion7(),
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };
        } 
    }
}
