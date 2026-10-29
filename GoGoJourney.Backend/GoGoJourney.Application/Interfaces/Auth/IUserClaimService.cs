using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public interface IUserClaimService
    {
        Task<MeResponse> GetOrCreateCurrentAsync(CancellationToken ct);
        Task<MeResponse> ChooseRoleAsync(Role role, CancellationToken ct);
    }
}
