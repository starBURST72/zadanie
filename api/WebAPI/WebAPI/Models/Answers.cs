using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Answers
    {
        [Key]
        public int answersId { get; set; }
        public int regId { get; set; }
        public int answer1 { get; set; }
        public int answer2 { get; set; }
        public int answer3 { get; set; }
        public int answer4 { get; set; }
        public int answer5 { get; set; }
        public int score { get; set; }
    }
}
