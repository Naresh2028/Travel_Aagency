using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Repository.Auth
{
    public class UserClaimRepository : IUserClaimRepository
    {
        private readonly AppDbContext _repo;

        public UserClaimRepository(AppDbContext repo) 
        {
            _repo = repo;
        }


        public Task SaveChangeAsync(CancellationToken ct) =>   _repo.SaveChangesAsync(ct);
        




    }
}
