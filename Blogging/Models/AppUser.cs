using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blogging.Models
{
    public class AppUser
    {
            [Column(TypeName = "nvarchar(100)")]
            public string Email { get; set; }

            [Column(TypeName = "nvarchar(100)")]
            public string Password { get; set; }
            [Column(TypeName = "nvarchar(100)")]
            public string FirstName { get; set; }
            [Column(TypeName = "nvarchar(100)")]
            public string LastName { get; set; }
            [Column(TypeName = "nvarchar(100)")]
            public string Fullname { get; set; }
            [Column(TypeName = "nvarchar(100)")]
            public string Country { get; set; }
            public long ContactNo { get; set; }
       
            [Column(TypeName = "nvarchar(200)")]
            public string ImgPath { get; set; }
            [Key] 
            public int id { get; set; }
            
       
           
            
           
        
         
          

    }
    
}
