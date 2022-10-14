using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blogging.Models
{
    public class Followings
    {
      
        public int id { get; set; }

        [ForeignKey("AppUser")]
        public int Userid { get; set; }
        public int Followingid { get; set; }


    }
}
