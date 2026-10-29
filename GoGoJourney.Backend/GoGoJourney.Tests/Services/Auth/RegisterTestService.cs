using AutoMapper;
using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Services.Auth;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Enums;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Domain.Interfaces.Common;
using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace GoGoJourney.Tests.Services.Auth
{
    //public class RegisterTestService
    //{

    //    [Fact]
    //    public async Task RegisterAsync_ValidateDetails_SendOtp() 
    //    {

    //        // Arrange

    //        var mapper = new Mock<IMapper>();
    //        var registerRepo = new Mock<IRegisterRepository>();
    //        var emailService = new Mock<IEmailService>();
    //        var passwordHasher = new Mock<IPasswordHasher<User>>();
    //        var userRepository = new Mock<IUserRepository>();
    //        var unitOfWork = new Mock<IUnitOfWork>();
    //        var refreshToken = new Mock<IRefreshTokenRepository>();
    //        var jwtService = new Mock<IJwtService>();

    //        var request = new RegistrationRequestDto
    //        {
    //            IdentityType = RegistrationIdentityType.email,
    //            IdentityValue = "test@gmail.com"
    //        };

    //        var registerId = Guid.NewGuid();

    //        var register = new Register 
    //        {
    //            Id = registerId,
    //            Email = request.IdentityValue
    //        };

    //        mapper
    //            .Setup(x => x.Map<Register>(request))
    //            .Returns(register);

    //        mapper
    //            .Setup(x => x.Map<RegistrationResponseDto>(register))
    //            .Returns(() => new RegistrationResponseDto
    //            {
    //                RegistrationId = registerId,
    //                IdentityType = request.IdentityType,
    //                IdentityValue = request.IdentityValue,
    //                OtpExpiresAt = register.OtpExpiresAt
    //            });


    //        var service = new AuthService(
    //            Mapper : mapper.Object,
    //            repo: registerRepo.Object,
    //            service: emailService.Object,
    //            userRepo: userRepository.Object,
    //            passwordHasher : passwordHasher.Object,
    //            unitOfWork:unitOfWork.Object,
    //            refreshRepo:refreshToken.Object,
    //            jwtService:jwtService.Object
    //            );

    //        // Act
    //        var result = await service.RegisterAsync(request);

    //        // Assert
    //        Assert.NotNull(result);
    //        Assert.Equal(request.IdentityType,result.IdentityType);
    //        Assert.Equal(registerId,result.RegistrationId);
    //        Assert.Equal(request.IdentityValue,result.IdentityValue);
    //        Assert.Equal(register.OtpExpiresAt,result.OtpExpiresAt);
            

    //        registerRepo.Verify(
    //            x => x.CreateAsync(It.Is<Register>(r => 
    //                r.OtpHash != string.Empty &&
    //                r.CreatedAt != default &&
    //                r.OtpExpiresAt > DateTime.UtcNow &&
    //                r.OtpAttemptCount == 0 &&
    //                r.IsCompleted == false &&
    //                r.IsVerified == false &&
    //                r.ModifiedAt == null
    //            )),
    //            Times.Once
    //            );

    //        emailService.Verify(
    //            x => x.SendOtp(
    //                request.IdentityValue,
    //                It.Is<string>(otp => 
    //                    otp.Length == 6 &&
    //                    otp.All(char.IsDigit))),
    //            Times.Once
    //            );


    //    } }
}
