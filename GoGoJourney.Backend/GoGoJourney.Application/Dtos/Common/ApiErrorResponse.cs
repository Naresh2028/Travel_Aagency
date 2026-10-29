using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Application.Dtos.Common
{
    public class ApiErrorResponse
    {
        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
    }
}
