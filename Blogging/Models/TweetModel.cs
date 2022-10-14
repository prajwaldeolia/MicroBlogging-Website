using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blogging.Models
{
    public class TweetModel
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "nvarchar(240)")]
        public string username { get; set; }
        [Column(TypeName = "nvarchar(240)")]
        public string tweet { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string ImgPath { get; set; }
        
        public int Userid { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Edited { get; set; }

    }
}
