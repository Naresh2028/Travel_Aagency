using GoGoJourney.Domain.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Common
{
    //public abstract class Entity
    //{
    //    private readonly List<IDomainEvent> _domainEvents = [];

    //    public Guid Id { get; set; }
    //    public Guid CreatedAt { get; set; }
    //    public Guid? ModifiedAt { get; set; }

    //    // EF: builder.Ignore(e => e.DomainEvents) in a shared configuration.
    //    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents;

    //    //Summary: call once, from the static factory. All times are UTC and passed in (TimeProvider in the application layer) 
    //    protected void Initialize(DateTime nowUtc)
    //    {
    //        CreatedAt = Guard.Utc(nowUtc, nameof(nowUtc));
    //        Id = Guid.CreateVersion7(new DateTimeOffset(nowUtc));
    //    }

    //    protected void Touch(DateTime nowUtc) => ModifiedAt = Guard.Utc(nowUtc, nameof(nowUtc));

    //    protected void Raise(IDomainEvent domainEvent) => _domainEvents.Add(domainEvent);

    //    public void ClearDomainEvens() => _domainEvents.Clear();

    //}
}
