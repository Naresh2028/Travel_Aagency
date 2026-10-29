using GoGoJourney.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.ToTable("refresh_token");

            builder.Property(r => r.TokenHash)
                    .HasMaxLength(64)
                    .IsRequired();

            builder.HasIndex(r => r.TokenHash)
                    .IsUnique();

            // Why here didn't used IsUniqu? alone HasIndex() what it does?
            builder.HasIndex(r => r.UserId);

            builder.HasOne<RefreshToken>()
                    .WithMany()
                    .HasForeignKey(r => r.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
