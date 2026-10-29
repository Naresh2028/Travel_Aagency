using GoGoJourney.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public class AgencyConfiguration : IEntityTypeConfiguration<Agency>
    {
        public void Configure(EntityTypeBuilder<Agency> builder) 
        {
            builder.ToTable("agencies");

            builder.HasKey(a => a.Id);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(a => a.Name)
                   .IsRequired()
                   .HasMaxLength(80);

            builder.HasIndex(a => a.UserId)
                    .IsUnique();

            builder.HasOne(a => a.User)
                    .WithOne()
                    .HasForeignKey<Agency>(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
