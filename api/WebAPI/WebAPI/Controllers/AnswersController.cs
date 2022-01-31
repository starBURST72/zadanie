using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public AnswersController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answers>>> GetAnswers()
        {
            return await _context.Answers.ToListAsync();
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answers>> GetAnswers(int id)
        {
            var answers = await _context.Answers.FindAsync(id);

            if (answers == null)
            {
                return NotFound();
            }

            return answers;
        }

        // PUT: api/Answers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswers(int id, Answers answers)
        {
            answers.answersId = id;

            _context.Entry(answers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Answers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Answers>> PostAnswers(Answers answers)
        {
            int score = 0;
            var sverka = await _context.Questions.ToListAsync();
            sverka.ToArray();
            int[] ans = new int[] 
            {answers.answer1,
            answers.answer2,
            answers.answer3,
            answers.answer4,answers.answer5};
      
            for (int i = 1; i < 6; i++)
            {
                if (ans[i - 1] == sverka[i-1].answer)
                {
                        score++;
        
                }
            }
            answers.score = score;

            _context.Answers.Add(answers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnswers", new { id = answers.answersId }, answers);
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Answers>> DeleteAnswers(int id)
        {
            var answers = await _context.Answers.FindAsync(id);
            if (answers == null)
            {
                return NotFound();
            }

            _context.Answers.Remove(answers);
            await _context.SaveChangesAsync();

            return answers;
        }

        private bool AnswersExists(int id)
        {
            return _context.Answers.Any(e => e.answersId == id);
        }
       
    }
}
