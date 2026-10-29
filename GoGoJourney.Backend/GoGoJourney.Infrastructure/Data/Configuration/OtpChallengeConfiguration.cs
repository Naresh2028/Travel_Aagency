using System;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using GoGoJourney.Domain.Entities;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public class OtpChallengeConfiguration : IEntityTypeConfiguration<OtpChallenge>
    {
        public void Configure(EntityTypeBuilder<OtpChallenge> builder) 
        {
            builder.ToTable("otp_challenge");

            builder.Property(o => o.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(15);

            // What role plays, Alone Haskey?
            builder.HasKey(o => o.Id);

            builder.Property(o => o.CodeHash)
                    .IsRequired();

            // Why two column is needed Index 
            builder.HasIndex(o => new { o.PhoneNumber, o.CreatedAt });
        }
    }
}
