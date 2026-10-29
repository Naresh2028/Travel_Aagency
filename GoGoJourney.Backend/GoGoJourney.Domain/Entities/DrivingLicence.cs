using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGoJourney.Domain.Entities
{
    public class DrivingLicence
    {

        /// <summary>
        /// Format: SS-RRYYYYNNNNNNN or SSRR YYYYNNNNNNN
        /// Example: DL-1420110012345 (15 characters total)
        /// </summary>
        [Required]
        [StringLength(16)]
        [RegularExpression(@"^([A-Z]{2}[0-9]{2})( )?([0-9]{4})[0-9]{7}$",
            ErrorMessage = "Invalid Indian Driving Licence format. Expected format like DL14 20110012345 or DL1420110012345.")]
        [Display(Name = "Licence Number")]
        public string LicenceNumber { get; private set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [Display(Name = "Full Name")]
        public string HolderName { get; private set; } = string.Empty;


        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Issue")]
        public DateTime DateOfIssue { get; private set; }


        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Validity")]
        public DateTime Validity { get; private set; }
        

    }
}
