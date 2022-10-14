using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blogging.Data;
using Blogging.Models;

namespace Blogging.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowingsController : ControllerBase
    {
        private readonly BloggingContext _context;

        public FollowingsController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/Followings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Followings>>> Getfollowing()
        {
            return await _context.following.ToListAsync();
        }

        // GET: api/Followings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Followings>> GetFollowings(int id)
        {
            var followings = await _context.following.FindAsync(id);

            if (followings == null)
            {
                return NotFound();
            }

            return followings;
        }

        // PUT: api/Followings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFollowings(int id, Followings followings)
        {
            if (id != followings.id)
            {
                return BadRequest();
            }

            _context.Entry(followings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FollowingsExists(id))
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

        // POST: api/Followings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Followings>> PostFollowings(Followings followings)
        {
            _context.following.Add(followings);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFollowings", new { id = followings.id }, followings);
        }

        // DELETE: api/Followings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFollowings(int id)
        {
            var followings = await _context.following.FindAsync(id);
            if (followings == null)
            {
                return NotFound();
            }

            _context.following.Remove(followings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FollowingsExists(int id)
        {
            return _context.following.Any(e => e.id == id);
        }
    }
}
