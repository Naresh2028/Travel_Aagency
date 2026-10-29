using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Auth
{
    public interface IUserRepository
    {
        Task CreateAsync(User request);
        Task<User?> GetByIdAsync(Guid id);

        Task<User?> GetByIdentifierAsync(string identifier);
        Task UpdateAsync(User request,Guid id);
    }
}
