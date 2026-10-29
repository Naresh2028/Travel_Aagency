using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Domain.Common
{
    /// <summary>
    /// A business rule was broken (illegal state change, wrong tenant, capacity exceeded...).
    /// The API layer maps this to 409/422. Bad *arguments* still throw ArgumentException.
    /// </summary>
    public class DomainException(string message) : Exception(message);  
}
