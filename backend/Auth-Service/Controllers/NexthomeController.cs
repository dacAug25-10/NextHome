using Auth_Service.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NexthomeController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDTO dto)
        {
           var db=new NexthomeContext();
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        x => x.Key,
                        x => x.Value.Errors.First().ErrorMessage
                    );

                return BadRequest(errors);
            }

          
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Phone = dto.Phone,
                Gender = dto.Gender,
                RoleId = dto.RoleId,
                CreatedAt = DateOnly.FromDateTime(dto.CreatedAt)
            };

            db.Users.Add(user);
            db.SaveChanges();

            return Ok("Inserted successfully");
        }

        [HttpPost("pg-property")]
        public string insertproperty(PgProperty pg)
        {
            var db = new NexthomeContext();
            int id = pg.OwnerId;
            User u = db.Users.Find(id);
            if (u.Role.RoleName.ToLower() == "owner")
            {
                db.PgProperties.Add(pg);
                db.SaveChanges();
                return "Listed Successfully";
            }
            else
            {
                return "You have no right to add pg-property";
            }
        }

        [HttpGet("getusers")]
        public IEnumerable<User> GetAllUsers()
        {
            var db = new NexthomeContext();
            return db.Users.ToList();
        }

        [HttpGet("getOneuser")]

        public object GetOneUser(int id)
        {
            var db = new NexthomeContext();

            var user = db.Users.Include(u => u.Role)
                               .FirstOrDefault(u => u.UserId == id);

            if (user == null)
                return new { message = "User not found" };

            return new
            {
                user.UserId,
                user.Name,
                user.Email,
                user.Phone,
                user.Gender,
                user.CreatedAt,
                user.Status,
                Role = user.Role == null ? null : new
                {
                    user.Role.RoleId,
                    user.Role.RoleName
                }
            };
        }



        [HttpPost("login")]
        public ActionResult<UserResponse> Login(string username, string password)
        {
            using var db = new NexthomeContext();

            var user = db.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Email == username && u.Password == password);

            if (user == null)
                return Unauthorized("Invalid username or password");

            var response = new UserResponse
            {
                UserId = user.UserId,
                Name = user.Name ?? "",
                Email = user.Email ?? "",
                Phone = user.Phone ?? "",
                Gender = user.Gender ?? "",
                CreatedAt = user.CreatedAt,
                Status = user.Status ?? "",
                Role = user.Role?.RoleName ?? "Tenant"
            };

            return Ok(response);
        }







        [HttpGet("roles")]
        public IEnumerable<GetRole> Getrole()
        {
            var db = new NexthomeContext();

            return db.Roles
                .Select(r => new GetRole
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName
                })
                .ToList();
        }

    }
}





    


