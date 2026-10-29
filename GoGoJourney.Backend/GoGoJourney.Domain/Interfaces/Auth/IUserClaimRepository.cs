using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Interfaces.Auth
{
    public interface IUserClaimRepository
    {


        public Task SaveChangeAsync(CancellationToken ct);
    }
}
