

using GoGoJourney.Application.Exceptions;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Application.Options.Auth;
using GoGoJourney.Domain.Entities;
using GoGoJourney.Domain.Enums;
using GoGoJourney.Domain.Interfaces.Auth;
using GoGoJourney.Domain.ValueObjects;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace GoGoJourney.Application.Services.Auth
{
    public sealed class AuthService(
             IOtpRepository otps,
             IOtpSender sender,
             IOptions<OtpOptions> otpOptions
        ) : IAuthService
    {
        private readonly OtpOptions _otp = otpOptions.Value;

        public async Task<OtpRequested> RequestOtpAsync(string rawPhone, CancellationToken ct)
        {
            var phone = Normalize(rawPhone);
            var now = DateTime.UtcNow;

            var recent = await otps.GetSinceAsync(phone, now.AddHours(-1), ct);
            if (recent.Count >= _otp.MaxSendsPerHour ||
                recent.Any(c => now - c.CreatedAt < TimeSpan.FromSeconds(_otp.ResendCooldownSeconds)))
                throw new AuthException(AuthFailure.TooManyRequests, "Too many requests. Please wait and try again.");

            foreach (var old in recent) old.Invalidate(now);   // only the newest code works

            var code = RandomNumberGenerator.GetInt32(0, 1_000_000).ToString("D6");
            var challenge = OtpChallenge.Create(phone, Hash(phone, code), TimeSpan.FromMinutes(_otp.ExpiryMinutes));

            await otps.AddAsync(challenge, ct);
            await otps.SaveChangesAsync(ct);

            await sender.SendAsync(phone, code, ct);

            return new OtpRequested(_otp.ExpiryMinutes * 60, _otp.ResendCooldownSeconds);
        }

        private static string Normalize(string raw) =>
            IndianMobile.TryNormalize(raw, out var phone)
            ? phone
            : throw new AuthException(AuthFailure.InvalidPhone, "Enter a valid 10 digit Indian mobile Number");

        // Keyed hash: a leaked table can't be brute-forced (6 digits is only 1M combinations)
        private byte[] Hash(string phone, string code) 
        {
            return HMACSHA256.HashData(Encoding.UTF8.GetBytes(_otp.Pepper), Encoding.UTF8.GetBytes($"{phone}:{code}"));
        }
    }
}
