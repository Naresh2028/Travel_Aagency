using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public sealed class OtpChallenge
    {
        private const int MaxAttempts = 5;

        private OtpChallenge() { }

        public Guid Id { get; private set; }
        public string PhoneNumber { get; private set; } = default!;
        public byte[] CodeHash { get; private set; } = default!;
        public DateTime ExpiresAt { get; private set; }
        public int Attempts { get; private set; }
        public DateTime? ConsumeAt { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public static OtpChallenge Create(string phoneNumber, byte[] codeHash, TimeSpan expiresAt) 
        {
            var now = DateTime.UtcNow;

            return new OtpChallenge
            {
                Id = Guid.NewGuid(),
                PhoneNumber = phoneNumber,
                CodeHash = codeHash,
                ExpiresAt = now.Add(expiresAt),
                CreatedAt = now
            };
        }

        public bool IsActive(DateTime now) 
        {
            if (ConsumeAt is not null)
                return false;

            if (now > ExpiresAt)
                return false;

            if (Attempts >= MaxAttempts)
                return false;

            return true;
        }

        public void RegisterFailedAttempt() => Attempts++;

        public void Consume(DateTime now) => ConsumeAt = now;

        public void Invalidate(DateTime now) => ConsumeAt ??= now;
    }
}
