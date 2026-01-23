using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Owner.models;

namespace Owner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        [HttpPost("AddUpdate")]
        public string addUpdate(PgProperty pg)
        {

        }
    }
}
