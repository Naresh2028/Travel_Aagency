using GoGoJourney.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Exceptions
{
    public sealed class AuthException(AuthFailure failure, string message): Exception(message) 
    {
        public AuthFailure Failure { get; } = failure;
    }
}
