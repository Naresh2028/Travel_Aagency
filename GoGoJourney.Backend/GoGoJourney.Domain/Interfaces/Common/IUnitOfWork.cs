using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Common
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollBackTransactionAsync();
    }
}
