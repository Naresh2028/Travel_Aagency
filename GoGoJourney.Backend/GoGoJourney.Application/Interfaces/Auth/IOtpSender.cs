using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Interfaces.Auth
{
    public interface IOtpSender
    {
        Task SendAsync(string e164Phone, string code, CancellationToken ct);
    }
}
