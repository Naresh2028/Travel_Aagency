using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class User
    {
        private User(){ }
        public Guid Id { get; private set; }
        public string? DisplayName { get; private set; }
        public string? PhoneNumber { get; private set; } = default!;
        public bool IsVerified { get; private set; } = false;
        public bool IsActive { get; private set; } = true;
        public string? City { get; private set; }
        public Role? Role { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }
        

        public static User Create(string phoneNumber) 
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                throw new ArgumentException("phoneNumber is required.", nameof(phoneNumber));

            return new User 
            {
                Id = Guid.NewGuid(),
                PhoneNumber = phoneNumber,
                CreatedAt = DateTime.UtcNow
            };
        }

        // Choose Role once and never changes it in v1.
        public void ChooseRole(Role role) 
        {
            if(Role is not null)
                throw new InvalidOperationException("role is already been choosen");

            if (!Enum.IsDefined(role))
                throw new ArgumentOutOfRangeException(nameof(role));

            Role = role;

            ModifiedAt = DateTime.UtcNow;
        }

        public void SetPhoneNumber(string phoneNumber) 
        {
            PhoneNumber = phoneNumber;
            ModifiedAt = DateTime.UtcNow;
        }
    }
}
