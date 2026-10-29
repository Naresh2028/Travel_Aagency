using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Agency
{
    public interface ITravellerRepository
    {
        Task<Traveller?> GetByIdAsync(Guid travellerId);
        Task<IReadOnlyList<Traveller>> GetListAsync();
        Task AddAsync(Traveller traveller);
        Task UpdateAsync(Traveller traveller);
        Task RemoveAsync(Traveller request);
    }
}
