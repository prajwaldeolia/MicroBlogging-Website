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
    public class followersController : ControllerBase
    {
        private readonly BloggingContext _context;

        public followersController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/followers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<follower>>> Getfollowers()
        {
            return await _context.followers.ToListAsync();
        }

        // GET: api/followers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<follower>> Getfollower(int id)
        {
            var follower = await _context.followers.FindAsync(id);

            if (follower == null)
            {
                return NotFound();
            }

            return follower;
        }

        // PUT: api/followers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putfollower(int id, follower follower)
        {
            if (id != follower.id)
            {
                return BadRequest();
            }

            _context.Entry(follower).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!followerExists(id))
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

        // POST: api/followers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<follower>> Postfollower(follower follower)
        {
            _context.followers.Add(follower);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getfollower", new { id = follower.id }, follower);
        }

        // DELETE: api/followers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletefollower(int id)
        {
            var follower = await _context.followers.FindAsync(id);
            if (follower == null)
            {
                return NotFound();
            }

            _context.followers.Remove(follower);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool followerExists(int id)
        {
            return _context.followers.Any(e => e.id == id);
        }
    }
}
