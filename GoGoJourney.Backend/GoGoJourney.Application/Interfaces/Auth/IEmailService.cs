using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public interface IEmailService
    {
        Task SendOtp(string email,string otp);
    }
}
