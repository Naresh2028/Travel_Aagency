using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class WhatsAppNotification
    {
        public Guid Id { get; private set; }
        public string? RecipientPhoneNumber { get; private set; }
        public string MessageBody { get; private set; } = string.Empty;

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime? SentAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

    }
}
