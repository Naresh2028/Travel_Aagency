using GoGoJourney.Domain.Interfaces.Common;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbContextTransaction? _dbTransaction;
        private readonly AppDbContext _dbContext;

        public UnitOfWork(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task BeginTransactionAsync()
        {
            _dbTransaction = await _dbContext.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_dbTransaction != null) 
            {
                await _dbTransaction.CommitAsync();
                await _dbTransaction.DisposeAsync();
                _dbTransaction = null;
            }
        }

        public async Task RollBackTransactionAsync()
        {
            if (_dbTransaction != null) 
            {
                await _dbTransaction.RollbackAsync();
                await _dbTransaction.DisposeAsync();

                _dbTransaction = null;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
