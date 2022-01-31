using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Questions
    {
        public int qId { get; set; }
        public string question { get; set; }
        public string variant1 { get; set; }
        public string variant2 { get; set; }
        public string variant3 { get; set; }
        public int answer { get; set; }
    }
}
