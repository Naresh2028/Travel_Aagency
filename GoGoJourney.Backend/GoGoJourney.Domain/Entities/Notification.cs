using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Entities
{
    public class Notification
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public NotificationType NotificationType { get; private set; }
        public EmailNotification? EmailNotification { get; private set; }
        public WhatsAppNotification? WhatsAppNotification { get; private set; }
        public NotificationStatus NotificationStatus { get; private set; }
        public Role? Role { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }
    }
}
