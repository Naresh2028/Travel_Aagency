using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Auth
{
    public interface IOtpRepository
    {
        Task<List<OtpChallenge>> GetSinceAsync(string phoneNumber, DateTime since, CancellationToken ct);
        Task AddAsync(OtpChallenge challenge, CancellationToken tk);
        Task SaveChangesAsync(CancellationToken ct);
    }
}
