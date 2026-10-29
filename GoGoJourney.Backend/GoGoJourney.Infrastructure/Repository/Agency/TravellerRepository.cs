using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Agency;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Agency
{
    public class TravellerRepository : ITravellerRepository
    {
        private readonly AppDbContext _dbContext;
        public TravellerRepository(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public Task AddAsync(Traveller request)
        {
            _dbContext.Travellers.Add(request);
            return Task.CompletedTask;
        }

        public async Task<Traveller?> GetByIdAsync(Guid travellerId)
        {
            return await _dbContext.Travellers.FindAsync(travellerId);
        }

        public async Task<IReadOnlyList<Traveller>> GetListAsync()
        {
            return await _dbContext.Travellers.ToListAsync();
        }

        public Task RemoveAsync(Traveller request)
        {
            _dbContext.Travellers.Remove(request);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Traveller traveller)
        {
            _dbContext.Travellers.Update(traveller);
            return Task.CompletedTask;
        }
    }
}
