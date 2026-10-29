using AutoMapper;
using GoGoJourney.Application.Dtos.Agency.Taraveller;
using GoGoJourney.Application.Interfaces.Agency;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Domain.Interfaces.Agency;
using GoGoJourney.Domain.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Services.Agency
{
    public class AgencyTravellerService : IAgencyTravellerService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUser _currentUser;

        public AgencyTravellerService(IUnitOfWork unitOfWork, ICurrentUser currentUser, IMapper mapper) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUser = currentUser;
        }
        public async Task ActivateAsync(Guid travellerId)
        {
            throw new NotImplementedException();
        }
        public async Task DeactivateAsync(Guid travellerId)
        {
            throw new NotImplementedException();
        }

        public async Task<TravellerResponseDto> GetByIdAsync(Guid travellerId)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<TravellerResponseDto>> GetListAsync()
        {
            throw new NotImplementedException();
        }

        public async Task InviteAsync(InviteTravellerRequestDto request)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveAsync(Guid travellerId)
        {
            throw new NotImplementedException();
        }

        public async Task<TravellerResponseDto> UpdateAsync(Guid travellerId, UpdateTravellerRequestDto request)
        {
            throw new NotImplementedException();
        }
    }
}
