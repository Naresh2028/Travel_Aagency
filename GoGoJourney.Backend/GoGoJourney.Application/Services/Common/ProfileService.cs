using AutoMapper;
using GoGoJourney.Application.Dtos.Common;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Interfaces.Common;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Services.Common
{
    public class ProfileService 
    {
        //private readonly IProfileRepository _profileRepo;
        //private readonly IMapper _mapper;
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly ICurrentUser _currentUser;
        //public ProfileService(
        //        IProfileRepository profileRepo, 
        //        IMapper mapper, 
        //        IUnitOfWork unitOfWork, 
        //        ICurrentUser currentUser
        //       ) 
        //{
        //    _profileRepo = profileRepo;
        //    _mapper = mapper;
        //    _unitOfWork = unitOfWork;
        //    _currentUser = currentUser;
        //}

        //public async Task<ProfileResponseDto> CreateAsync(CreateProfileRequestDto request, CancellationToken token)
        //{
        //    var userId = _currentUser.UserId;
        //    var role = _currentUser.Role;

        //    var existingProfile = await _profileRepo.GetByUserIdAsync(userId:userId);

        //    if (existingProfile != null)
        //        throw new InvalidOperationException("Profile already exist.");

        //    var profile = _mapper.Map<UserProfile>(request);

        //    profile.ProfileId = Guid.NewGuid();
        //    profile.UserId = userId;
        //    profile.CreatedAt = DateTime.UtcNow;
        //    profile.ModifiedAt = null;
        //    profile.IsCompleted = false;

            

        //    await _profileRepo.CreateAsync(profile);

        //    await _unitOfWork.SaveChangesAsync();

        //    var response = _mapper.Map<ProfileResponseDto>(profile);

        //    return response;
        //}

        //public async Task  CompleteAsync(Guid Id, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task  DeActivateAsync(Guid Id, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task <ProfileResponseDto?> GetByIdAsync(Guid Id, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task  RemoveAsync(Guid Id, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task  RevokeAsync(Guid Id, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task <ProfileResponseDto> UpdateAsync(UpdateProfileRequestDto request, CancellationToken token)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
