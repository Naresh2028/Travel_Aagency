using GoGoJourney.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> model) 
        {
            model.ToTable("users");

            model.HasKey(u => u.Id);

            model.Property(u => u.Role)
                .HasConversion<string>();

            model.Property(u => u.PhoneNumber)
                 .IsRequired(true)
                 .HasMaxLength(15);

            model.HasIndex(u => u.PhoneNumber)
                 .IsUnique();

            model.Property(u => u.CreatedAt)
                .IsRequired();

            model.Property(u => u.ModifiedAt)
                .IsRequired(false)
                .HasColumnType("timestamp");

            

        }
    }
}
