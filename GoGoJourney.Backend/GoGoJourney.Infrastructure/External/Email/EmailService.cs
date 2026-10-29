using GoGoJourney.Application.Interfaces.Auth;
using System;
using Resend;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.External.Email
{
    public class EmailService : IEmailService
    {
        private readonly IResend _service;
        public EmailService(IResend service) 
        {
            _service = service;
        }
        public async Task SendOtp(string email, string otp) 
        {
            var message = new EmailMessage
            {
                From = "GoGoJourney <onboarding@resend.dev>",
                To = new[] { email },
                Subject = "GoGoJourney Registeration OTP",
                HtmlBody = $"""
                            <h2>GoGoJourneys</h2>
                            <p>Your registration OTP is: </p>
                            <h1>{otp}</h1>
                            <p>This Otp is valid for 5 minutes</P>
                            <p>Best regards,<br/>GoGoJourneys Team</p>
                            """

            };
            await _service.EmailSendAsync(message);
        }
    }
}
