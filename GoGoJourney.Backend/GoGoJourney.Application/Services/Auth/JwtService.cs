using GoGoJourney.Application.Common.Options;
using GoGoJourney.Application.Dtos.Auth;
using GoGoJourney.Application.Interfaces.Auth;
using GoGoJourney.Domain.Entities;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens.Experimental;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace GoGoJourney.Application.Services.Auth
{
    public class JwtService : IJwtService
    {
        private readonly JwtOptions _option;
        public JwtService(IOptions<JwtOptions> option) 
        {
            _option = option.Value;
        }

        // Generate Registration Token Start
        public (string Token,DateTime ExpiresAt) GenerateRegistrationToken(Guid registrationId) 
        {
            var claims = new[] 
            {
                new Claim("registrationId",registrationId.ToString()),
                new Claim("tokenType","regisgtration")
            }; 

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_option.SecretKey));

            var signingCredentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var expiresAt = DateTime.UtcNow.AddMinutes(_option.RegistrationTokenExpirationMinutes);

            var token = new JwtSecurityToken(
                    issuer:_option.Issuer,
                    audience:_option.Audience,
                    claims: claims,
                    expires: expiresAt,
                    signingCredentials: signingCredentials
                );

            string generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return (generatedToken, expiresAt);
        }

        // Generate Registration Token End

        // ------------------------------------------------------------------------------------------------

        // Validate Registration Token Start
        public Guid ValidateRegistrationToken(string token) 
        {

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_option.SecretKey));

            var validationParameters = new TokenValidationParameters 
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,

                ValidateIssuer = true,
                ValidIssuer = _option.Issuer,

                ValidateAudience = true,
                ValidAudience = _option.Audience,

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero

            };

            var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

            var tokenType = principal.FindFirst("tokenType")?.Value;

            if (tokenType != "registration")
                throw new UnauthorizedAccessException("Invalid registration token!");

            var registrationIdValue = principal.FindFirst("registrationId")?.Value;

            if (!Guid.TryParse(registrationIdValue,out var registrationId)) 
            {
                throw new UnauthorizedAccessException("Invalid registration token!");
            }

            return registrationId;
        }

        // Validate Registration Token End

        // ------------------------------------------------------------------------------------------------

        // Generate Access Token Start

        public (string Token, DateTimeOffset ExpiresAt) GenerateAccessToken(User user) 
        {

            var claims = new[]
            {
                new Claim(
                    System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub,
                    user.Id.ToString()
                    ),

                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()
                    ),

                //new Claim(
                //    ClaimTypes.Email,
                //    user.Email ?? string.Empty
                //    )
            };

            if (user.Role.HasValue) 
            {
                claims = claims
                    .Append(
                        new Claim(
                            ClaimTypes.Role,
                            user.Role.Value.ToString()))
                    .ToArray();
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_option.SecretKey));

            var signingCredentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var expiresAt = DateTimeOffset.UtcNow.AddMinutes(_option.AccessTokenExpirationMinutes);

            var token = new JwtSecurityToken(
                    issuer:_option.Issuer,
                    audience:_option.Audience,
                    claims:claims,
                    expires: expiresAt.UtcDateTime,
                    signingCredentials: signingCredentials
                );

            var generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return (generatedToken, expiresAt);
        }

        // Generate Access Token End

        // ------------------------------------------------------------------------------------------------

        // Generate Refresh Token Start

        public (string Token, DateTimeOffset ExpiresAt) GenerateRefreshToken() 
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);

            var token = Convert.ToBase64String(tokenBytes);

            var expiresAt = DateTime.UtcNow.AddMinutes(_option.RefreshTokenExpirationDays);

            return (Token: token, ExpiresAt: expiresAt);

        }

        // Generate Refresh Token End

        // ------------------------------------------------------------------------------------------------
    }
}
