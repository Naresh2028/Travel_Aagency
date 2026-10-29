using GoGoJourney.Domain.Common;
using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public sealed class Invitation
    {
        // No 0/O/1/I so codes survive being read out over a call
        private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        private Invitation() { }

        public Guid Id { get; private set; }
        public string Code { get; private set; } = default!;
        public Role Role { get; private set; }
        public string? AgencyName { get; private set; }   // set for Agency invites
        public Guid? AgencyId { get; private set; }       // set for Driver/Traveller invites (later)
        public DateTime ExpiresAt { get; private set; }
        public DateTime? RedeemedAt { get; private set; }
        public Guid? RedeemedByUserId { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public static Invitation ForNewAgency(string agencyName, TimeSpan validFor)
        {
            if (string.IsNullOrWhiteSpace(agencyName))
                throw new DomainException("Agency name is required.");

            var now = DateTime.UtcNow;
            return new Invitation
            {
                Id = Guid.NewGuid(),
                Code = GenerateCode(),
                Role = Role.Agency,
                AgencyName = agencyName.Trim(),
                ExpiresAt = now.Add(validFor),
                CreatedAt = now
            };
        }

        public void Redeem(Guid userId)
        {
            var now = DateTime.UtcNow;
            if (RedeemedAt is not null || now > ExpiresAt)
                throw new DomainException("Invalid or expired invite code.");

            RedeemedAt = now;
            RedeemedByUserId = userId;
        }

        private static string GenerateCode()
        {
            Span<char> chars = stackalloc char[8];
            for (var i = 0; i < chars.Length; i++)
                chars[i] = Alphabet[RandomNumberGenerator.GetInt32(Alphabet.Length)];
            return $"{new string(chars[..4])}-{new string(chars[4..])}";
        }
    }
}
