using Owner.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Owner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        [HttpPost("addpgproperty")]
        public IActionResult postPgProperty([FromBody] Pg_PropertyDTO pg)
        {
            if (pg == null)
            {
                return Ok(new {message= "Invalid property Data" });
            }
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var db = new NexthomeContext();
            var entity = new PgProperty
            {
                OwnerId = pg.OwnerId,
                PgName = pg.PgName,
                Description = pg.Description,
                AreaId = pg.AreaId,
                Type = pg.Type,
                Rent = pg.Rent,
                Facility = pg.Facility,
                Status = pg.Status
            };
            db.PgProperties.Add(entity);
            db.SaveChanges();
            return Ok(new { Message = "Save Successfully",
                             pgId=entity.PgId});
        }

        [HttpPut("updatepg")]
        public IActionResult UpdatePg(int id,[FromBody]PgPropertyUpdateDTO pg)
        {
                var db = new NexthomeContext();

                var existingPg = db.PgProperties.FirstOrDefault(p => p.PgId == id);

                if (existingPg == null)
                {
                    return NotFound("PG property not found");
                }

                if (pg.PgName != null)
                    existingPg.PgName = pg.PgName;

                if (pg.Description != null)
                    existingPg.Description = pg.Description;

                if (pg.Type != null)
                    existingPg.Type = pg.Type;

                if (pg.Rent.HasValue)
                    existingPg.Rent = pg.Rent.Value;

                if (pg.Facility != null)
                    existingPg.Facility = pg.Facility;

                if (pg.Status != null)
                    existingPg.Status = pg.Status;

                db.SaveChanges();

                return Ok(new
                {
                    message = "PG updated successfully",
                    pgId = existingPg.PgId
                });
        }
        [HttpPost("addroom")]
        public IActionResult AddRoom([FromBody] RoomDTO room)
        {
            using var db = new NexthomeContext(); 

            var entity = new Room
            {
                PgId = room.PgId,
                RoomNo = room.RoomNo,
                RoomType = room.RoomType,
                TotalBed = room.TotalBed,
                AvailableBed = room.AvailableBed,
                Sharing = room.Sharing,
                SecurityDeposit = room.SecurityDeposit,
                Status = room.Status
            };

            db.Rooms.Add(entity);
            db.SaveChanges();

            return Ok(new
            {
                message = "Room data saved successfully",
                roomId = entity.RoomId,
                pgId = room.PgId
            });
        }

    }

}
