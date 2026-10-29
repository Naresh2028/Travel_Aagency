using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Auth
{
    public record MeResponse (Guid Id, string? DisplayName, string? PhoneNumber, Role? Role)
    {
        public static MeResponse From(User user) =>
            new(user.Id,user.DisplayName, user.PhoneNumber, user?.Role);
    }

    public record ChooseRoleRequest(Role? Role);
}
