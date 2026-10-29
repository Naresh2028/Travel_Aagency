using GoGoJourney.Application.Dtos;
using GoGoJourney.Application.Dtos.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public sealed record OtpRequested(int ExpiresInSeconds, int ResendAfterSeconds);
    public interface IAuthService
    {
        //Task<RegistrationResponseDto> RegisterAsync(RegistrationRequestDto request);
        //Task<VerifyOtpResponseDto> VerifyOtpAsync(VerifyOtpRequestDto request);
        //Task<CompleteRegistrationResponseDto> CompleteRegistrationAsync(PasswordRequestDto request);
        //Task<TokenResponseDto> LoginAsync(LoginRequestDto request);
        //Task<TokenResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request);
        //Task LogoutAsync(RefreshTokenRequestDto request);

        Task<OtpRequested> RequestOtpAsync(string phoneNumber, CancellationToken ct);
    }
}
