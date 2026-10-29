using AutoMapper;
using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Services.Auth;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Domain.Interfaces.Common;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

namespace GoGoJourney.Tests.Services.Auth
{
    //public class VerifyOtpTest
    //{

    //    public async Task VerifyOtpAsync_ValidateRegister_TokenGeneration()
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


    //        const string otp = "123456";

    //        var registerId = Guid.NewGuid();

    //        var HashOtp = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(otp)));

    //        var register = new Register
    //        {
    //            Id = registerId,
    //            Email = "test@gmail.com",
    //            OtpHash = HashOtp,
    //            OtpExpiresAt = DateTime.UtcNow.AddMinutes(5),
    //            OtpAttemptCount = 0,
    //            IsCompleted = false,
    //            CreatedAt = DateTime.UtcNow,
    //            ModifiedAt = null
    //        };

    //        var request = new VerifyOtpRequestDto
    //        {
    //            RegistrationId = registerId,
    //            Otp = otp
    //        };


    //        registerRepo
    //            .Setup(x => x.GetByIdAsync(id: registerId))
    //            .ReturnsAsync(register);

    //        registerRepo
    //            .Setup(x => x.UpdateAsync(It.IsAny<Register>()))
    //            .Returns(Task.CompletedTask);


    //        var registerToken = "register-token";
    //        var registerTokenExpiresAt = DateTime.UtcNow.AddMinutes(10);


    //        jwtService
    //            .Setup(x => x.GenerateRegistrationToken(registerId))
    //            .Returns((registerToken, registerTokenExpiresAt));

    //        var service = new AuthService(
    //             Mapper: mapper.Object,
    //             repo: registerRepo.Object,
    //             service: emailService.Object,
    //             userRepo: userRepository.Object,
    //             passwordHasher: passwordHasher.Object,
    //             unitOfWork: unitOfWork.Object,
    //             refreshRepo: refreshToken.Object,
    //             jwtService: jwtService.Object
    //        );

    //        // Act
    //        var result = await service.VerifyOtpAsync(request);

    //        // Assert
    //        Assert.NotNull(result);

    //        Assert.Equal(registerToken, result.RegistrationToken);

    //        Assert.Equal(registerTokenExpiresAt, result.RegistrationTokenExpiresAt);

    //        Assert.True(register.IsVerified);

    //        registerRepo.Verify(x => x.GetByIdAsync(registerId), Times.Once);

    //        registerRepo.Verify(x => x.UpdateAsync(It.Is<Register>(
    //                r => 
    //                r.Id == registerId &&
    //                r.IsVerified &&
    //                r.ModifiedAt != null
    //              )),
    //                Times.Once
    //            );

    //        jwtService.Verify(x => x.GenerateRegistrationToken(registerId), Times.Once);

    //    }
    //}
}
