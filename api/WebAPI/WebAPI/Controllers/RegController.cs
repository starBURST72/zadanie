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
    public class RegController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public RegController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/Reg
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reg>>> GetReg()
        {
            return await _context.Reg.ToListAsync();
        }

        // GET: api/Reg/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reg>> GetReg(int id)
        {
            var reg = await _context.Reg.FindAsync(id);

            if (reg == null)
            {
                return NotFound();
            }

            return reg;
        }

        // PUT: api/Reg/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReg(int id, Reg reg)
        {
            reg.regId = id;
               

            _context.Entry(reg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegExists(id))
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

        // POST: api/Reg
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Reg>> PostReg(Reg reg)
        {
            _context.Reg.Add(reg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReg", new { id = reg.regId }, reg);
        }

        // DELETE: api/Reg/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reg>> DeleteReg(int id)
        {
            var reg = await _context.Reg.FindAsync(id);
            if (reg == null)
            {
                return NotFound();
            }

            _context.Reg.Remove(reg);
            await _context.SaveChangesAsync();

            return reg;
        }

        private bool RegExists(int id)
        {
            return _context.Reg.Any(e => e.regId == id);
        }
    }
}
