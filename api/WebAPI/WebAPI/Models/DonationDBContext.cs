using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class DonationDBContext:DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options):base(options)
        {

        }

        public DbSet<Questions> Questions { get; set; }
        public DbSet<Reg> Reg { get; set; }
        public DbSet<Answers> Answers { get; set; }
    }

}
