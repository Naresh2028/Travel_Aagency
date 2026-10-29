using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public sealed class RefreshToken
    {
        private RefreshToken() { }

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string TokenHash { get; set; } = default!;
        public DateTime ExpiresAt { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime? RevokedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        public static RefreshToken Create(Guid userId, TimeSpan expiresAt, string hashCode)
        {
            var now = DateTime.UtcNow;

            return new RefreshToken 
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                TokenHash = hashCode,
                CreatedAt = now,
                ExpiresAt = now.Add(expiresAt)
            };
        }

        public bool IsActive(DateTime now) => RevokedAt is null && now < ExpiresAt;
        public void Revoke(DateTime now) => RevokedAt ??= now;
    }
}
