using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Reg
    {
        [Key]
        public int regId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string surname { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string middlename { get; set; }
    }
}
