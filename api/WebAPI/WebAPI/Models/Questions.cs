using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Questions
    {
        [Key]
        public int qId { get; set; }
        
        
        [Column(TypeName = "nvarchar(100)")]
        public string question { get; set; }
        
        
        [Column(TypeName = "nvarchar(100)")]
        public string variant1 { get; set; }
        
        
        [Column(TypeName = "nvarchar(100)")]
        public string variant2 { get; set; }
       
        
        [Column(TypeName = "nvarchar(100)")]
        public string variant3 { get; set; }
        
        public int answer { get; set; }
    }
}
