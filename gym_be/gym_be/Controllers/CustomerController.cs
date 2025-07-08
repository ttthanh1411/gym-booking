using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gym_be.Models;

namespace gym_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly GymContext _context;

        public CustomerController(GymContext context)
        {
            _context = context;
        }

        // ✅ GET: api/customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            return Ok(customers);
        }

        // ✅ GET: api/customer/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomerById(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // ✅ POST: api/customer
        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer([FromBody] Customer customer)
        {
            customer.CustomerID = Guid.NewGuid(); //UUID
            customer.Status = 1;
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomerById),
                new { id = customer.CustomerID },
                customer);
        }

        // ✅ DELETE: api/customer/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent(); // HTTP 204 - Xóa thành công, không trả nội dung
        }
    }
}
