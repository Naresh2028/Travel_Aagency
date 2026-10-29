using GoGoJourney.Application.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Common
{
    public interface IProfileServices
    {
        Task<ProfileResponseDto> CreateAsync(CreateProfileRequestDto request, CancellationToken token);
        Task<ProfileResponseDto> UpdateAsync(UpdateProfileRequestDto request, CancellationToken token);
        Task<ProfileResponseDto?> GetByIdAsync(Guid Id, CancellationToken token);
        Task RemoveAsync(Guid Id, CancellationToken token);
        Task CompleteAsync(Guid Id, CancellationToken token);
        Task RevokeAsync(Guid Id, CancellationToken token);
        Task DeActivateAsync(Guid Id, CancellationToken token);
    }
}
