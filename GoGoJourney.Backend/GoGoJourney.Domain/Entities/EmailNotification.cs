using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class EmailNotification
    {
        public Guid Id { get; private set; }
        public string RecipientEmail { get; private set; } = string.Empty;
        public string SenderEmail { get; private set; } = string.Empty;
        public string Subject { get; private set; } = string.Empty;
        public string Body { get; private set; } = string.Empty;
        public string? ErrorMessage { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? SentAt { get; set; }
        public DateTime? ModifiedAt { get; private set; }

    }
}
