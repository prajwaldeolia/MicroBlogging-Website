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
    public class TweetModelsController : ControllerBase
    {
        private readonly BloggingContext _context;

        public TweetModelsController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/TweetModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TweetModel>>> Gettweet()
        {
            return await _context.tweet.ToListAsync();
        }

        // GET: api/TweetModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TweetModel>> GetTweetModel(int id)
        {
            var tweetModel = await _context.tweet.FindAsync(id);

            if (tweetModel == null)
            {
                return NotFound();
            }

            return tweetModel;
        }

        // PUT: api/TweetModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTweetModel(int id, TweetModel tweetModel)
        {
            if (id != tweetModel.id)
            {
                return BadRequest();
            }

            _context.Entry(tweetModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TweetModelExists(id))
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

        // POST: api/TweetModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TweetModel>> PostTweetModel(TweetModel tweetModel)
        {
            _context.tweet.Add(tweetModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTweetModel", new { id = tweetModel.id }, tweetModel);
        }

        // DELETE: api/TweetModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTweetModel(int id)
        {
            var tweetModel = await _context.tweet.FindAsync(id);
            if (tweetModel == null)
            {
                return NotFound();
            }

            _context.tweet.Remove(tweetModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TweetModelExists(int id)
        {
            return _context.tweet.Any(e => e.id == id);
        }
    }
}
