using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Auth
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task CreateAsync(User request)
        {
            _dbContext.Users.Add(request);

        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task UpdateAsync(User request, Guid id)
        {
            _dbContext.Users.Update(request);
        }

        

        public async Task<User?> GetByIdentifierAsync(string identifier)
        {
            return await _dbContext.Users
                   .FirstOrDefaultAsync(u => u.PhoneNumber == identifier);
        }
    }
}
