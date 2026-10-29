using GoGoJourney.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data.Configuration
{
    public sealed class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> b)
        {
            b.ToTable("invitations");
            b.HasKey(x => x.Id);

            b.Property(x => x.Code).HasMaxLength(16).IsRequired();
            b.HasIndex(x => x.Code).IsUnique();

            b.Property(x => x.Role).HasConversion<string>().HasMaxLength(20);
            b.Property(x => x.AgencyName).HasMaxLength(150);

            // Stops two simultaneous redeems both succeeding
            b.Property<uint>("xmin").HasColumnType("xid")
             .ValueGeneratedOnAddOrUpdate().IsConcurrencyToken();
        }
    }
}
