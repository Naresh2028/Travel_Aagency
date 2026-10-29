using AutoMapper.Internal;
using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Interfaces.Common;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Enums;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Domain.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Services.Auth
{
    public class UserClaimService 
    {
        //private ICurrentClaimUser _currentUser;
        //private readonly IUserClaimRepository _userRepo;

        //public UserClaimService(ICurrentClaimUser currentUser, IUserClaimRepository userRepo)
        //{
        //    _currentUser = currentUser;
        //    _userRepo = userRepo;
        //}
        //public async Task<MeResponse> ChooseRoleAsync(Role role, CancellationToken ct)
        //{
        //    var user = await GetOrCreateUserAysnc(ct);

        //    user.ChooseRole(role);  // throws Domain exception when not found.

        //    await _userRepo.SaveChangeAsync(ct);

        //    return MeResponse.From(user);
        //}

        //public async Task<MeResponse> GetOrCreateCurrentAsync(CancellationToken ct)
        //{
        //    return MeResponse.From(await GetOrCreateUserAysnc(ct));
        //}

        //private async Task<User> GetOrCreateUserAysnc(CancellationToken ct)
        //{
        //    var clerkUserId = _currentUser.ClerkUserId;

        //    var user = await _userRepo.GetByClerkUserIdByAsync(clerkUserId, ct);

        //    if (user is not null)
        //        return user;

        //    // From the Profile Setup form
        //    // The token only carries the clerk.Id. Email, name arrive later.
        //    var created = User.Create(clerkUserId, email:null,displayName:null);

        //    if (await _userRepo.TryAddAsync(created, ct))
        //        return created;

        //    // Another request created the same user first, so read it back.
        //    return await _userRepo.GetByClerkUserIdByAsync(clerkUserId, ct) ??
        //        throw new InvalidOperationException("User could not be created.");
        //}
    }
}
