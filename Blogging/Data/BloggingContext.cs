using Blogging.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blogging.Data
{
    public class BloggingContext:DbContext
    {
        public BloggingContext(DbContextOptions<BloggingContext> options):base(options)
        {
           
        }
        public DbSet<TweetModel> tweet { get; set; }
       
        public DbSet<AppUser> appUsers { get; set; }
         
        public DbSet<Followings> following { get; set; }
        public DbSet<follower> followers { get; set; }
      

    }
}
