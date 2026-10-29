using Microsoft.EntityFrameworkCore;
using GoGoJourney.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoGoJourney.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> option):base(option) 
        {

        }
        public DbSet<Agency> Agency { get; set; }
        public DbSet<User> Users { get;  set; }
        public DbSet<Traveller> Travellers { get; set; }
        public DbSet<OtpChallenge> OtpChallenge { get; set; }


        protected override void OnModelCreating(ModelBuilder model) 
        {
            model.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            base.OnModelCreating(model);
        }
    }
}
