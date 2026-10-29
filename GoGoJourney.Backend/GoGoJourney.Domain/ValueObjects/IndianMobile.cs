using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.ValueObjects
{
    public static class IndianMobile
    {
        // "98765 43210", "+91 98765-43210", "09876543210" -> "+919876543210"
        public static bool TryNormalize(string? input, out string e164) 
        {
            e164 = string.Empty;

            if (string.IsNullOrEmpty(input))
                return false;

            var digits = new string(input.Where(char.IsDigit).ToArray());

            if (digits.Length == 12 && digits.StartsWith("91"))
            {
                digits = digits[2..];
            }
            else if (digits.Length == 11 && digits[0] == '0') 
            {
               digits = digits[1..];
            }

            // Indian mobile numbers start with 7
            if (digits.Length != 10 && digits[0] < '6') 
            {
                return false;
            }

            e164 = "+91" + digits;

            return true;
        }
    }
}
