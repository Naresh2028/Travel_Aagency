using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Common;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Common
{
    public class ProfileRepository 
    {
        //private readonly AppDbContext _dbContext;

        //public ProfileRepository(AppDbContext dbContext) 
        //{
        //    _dbContext = dbContext;
        //}
        //public Task CreateAsync(UserProfile request)
        //{
        //    _dbContext.UserProfiles.Add(request);
        //    return Task.CompletedTask;
        //}

        //public async Task<UserProfile?> GetByIdAsync(Guid id)
        //{
        //    return await _dbContext.UserProfiles
        //            .FirstOrDefaultAsync(u => u.ProfileId == id);
        //}

        //public async Task<UserProfile?> GetByUserIdAsync(Guid userId)
        //{
        //    return await _dbContext.UserProfiles
        //            .FirstOrDefaultAsync(u => u.UserId == userId);
        //}

        //public Task RemoveAsync(UserProfile request)
        //{
        //    _dbContext.UserProfiles.Remove(request);
        //    return Task.CompletedTask;
        //}

        //public Task UpdateAsync(UserProfile request)
        //{
        //    _dbContext.UserProfiles.Update(request);
        //    return Task.CompletedTask;
        //}
    }
}
