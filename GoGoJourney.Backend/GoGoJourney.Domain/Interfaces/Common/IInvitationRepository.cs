using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Common
{
    public interface IInvitationRepository
    {
        Task<Invitation?> GetByCodeAsync(string code, CancellationToken ct);
        Task AddAsync(Invitation invitation, CancellationToken ct);
        Task SaveChangesAsync(CancellationToken ct);   // one SaveChanges commits user + agency + invitation together
    }
}
