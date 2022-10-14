using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blogging.Models
{
    public class follower
    {
        public int id { get; set; }

        [ForeignKey("AppUser")]
        public int Userid { get; set; }

        [ForeignKey("AppUser")]
        public int Followerid { get; set; }
    }
}
