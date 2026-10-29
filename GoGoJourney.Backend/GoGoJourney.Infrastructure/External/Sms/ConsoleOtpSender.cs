using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Text;
using GoGoJourney.Application.Interfaces.Auth;

namespace GoGoJourney.Infrastructure.External.Sms
{
    public class ConsoleOtpSender : IOtpSender
    {
        private readonly ILogger<ConsoleOtpSender> _logger;

        public ConsoleOtpSender(ILogger<ConsoleOtpSender> logger)
        {
            _logger = logger;
        }

        public Task SendAsync(string e164Phone, string code, CancellationToken ct)
        {
            _logger.LogWarning("DEV OTP for {phone} is {code}", e164Phone, code);
            return Task.CompletedTask;
        }
    }
}
