using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Auth
{
    public class OtpRepository : IOtpRepository
    {
        private AppDbContext _dbContext;

        public OtpRepository(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(OtpChallenge challenge, CancellationToken ct)
        {
            await _dbContext.OtpChallenge.AddAsync(challenge, ct);
        }

        public async Task<List<OtpChallenge>> GetSinceAsync(string phoneNumber, DateTime since, CancellationToken ct)
        {
            return await _dbContext.OtpChallenge
                    .Where(c => 
                            c.PhoneNumber == phoneNumber && 
                            c.CreatedAt >= since)
                    .ToListAsync(ct);
        }

        public Task SaveChangesAsync(CancellationToken ct)
        {
            return _dbContext.SaveChangesAsync(ct);
        }
    }
}
