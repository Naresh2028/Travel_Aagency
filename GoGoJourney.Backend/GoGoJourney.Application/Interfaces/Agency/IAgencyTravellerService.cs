using GoGoJourney.Application.Dtos.Agency.Taraveller;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Agency
{
    public interface IAgencyTravellerService
    {
        Task<IReadOnlyList<TravellerResponseDto>> GetListAsync();
        Task<TravellerResponseDto> GetByIdAsync(Guid travellerId);
        Task<TravellerResponseDto> UpdateAsync(Guid travellerId, UpdateTravellerRequestDto request);
        Task ActivateAsync(Guid travellerId);
        Task DeactivateAsync(Guid travellerId);
        Task RemoveAsync(Guid travellerId);
        Task InviteAsync(InviteTravellerRequestDto request);
    }
}
