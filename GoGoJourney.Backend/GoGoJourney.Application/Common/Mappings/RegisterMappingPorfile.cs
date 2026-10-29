using AutoMapper;
using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Common.Mappings
{
    public class RegisterMappingProfile : Profile
    {
        //public RegisterMappingProfile() 
        //{
        //    CreateMap<RegistrationRequestDto, Register>()
        //        .ForMember(dest => dest.Email,
        //            opt => opt.MapFrom(src => src.IdentityValue));

        //    CreateMap<Register, RegistrationResponseDto>();
        //}
    }
}
