using GoGoJourney.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public class TravellerConfiguration : IEntityTypeConfiguration<Traveller>
    {
        public void Configure(EntityTypeBuilder<Traveller> builder)
        {
            builder.ToTable("travellers");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.CreatedAt)
                .IsRequired();

            builder.HasIndex(t => t.UserId)
                .IsUnique();

            builder.HasOne(u => u.User)
                    .WithOne()
                    .HasForeignKey<Traveller>(t => t.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
