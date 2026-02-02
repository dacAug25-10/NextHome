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
                Status = "Available"
            };
            db.PgProperties.Add(entity);
            db.SaveChanges();
            return Ok(new { Message = "Save Successfully",
                             pgId=entity.PgId});
        }
        [HttpGet("getpgs")]
        public ActionResult<IEnumerable<PgPropertyResponseDTO>> GetPgProperties()
        {

            var db = new NexthomeContext();

            var result = db.PgProperties
               .Select(pg => new PgPropertyResponseDTO
               {
                   PgId=pg.PgId,
                   OwnerId=pg.OwnerId,
                   PgName = pg.PgName,
                   Description = pg.Description,
                   Rent = pg.Rent,
                   Facility = pg.Facility,
                   AreaId = pg.AreaId, // or map to location name if needed
                   Status = pg.Status
               })
               .ToList();

            return Ok(result);
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

        [HttpGet("getcomplaints")]
        public IActionResult GetComplaint(int pgId)
        {
            var db = new NexthomeContext();

            var complaints = db.Complaints
                               .Where(c => c.PgId == pgId)
                               .Select(c => new ComplaintDTO
                               {
                                   ComplaintId = c.ComplaintId,
                                   TenantId = c.TenantId,
                                   PgId = c.PgId,
                                   Message = c.Message,
                                   Status = c.Status,
                                   ComplaintAt = c.ComplaintAt
                               })
                               .ToList();

            if (!complaints.Any())
                return NotFound("No complaints found for this PG.");

            return Ok(complaints);
        }
        [HttpGet("getfeedback")]
        public ActionResult GetFeedback(int pgId)
        {
            using var db = new NexthomeContext();

            var feedbackList = db.Feedbacks
                                 .Where(f => f.PgId == pgId)
                                 .Select(f => new FeedBackDTO
                                 {
                                     FeedbackId = f.FeedbackId,
                                     TenantId = f.TenantId,
                                     PgId = f.PgId,
                                     Rating = f.Rating,
                                     Comment = f.Comment
                                 })
                                 .ToList();

            if (feedbackList.Count == 0)
            {
                return Ok("No feedback found for this PG."); 
            }

            return Ok(feedbackList); 
        }

        [HttpGet("bookings/pending")]
        public ActionResult GetPendingBookings(int ownerId)
        {
            using var db = new NexthomeContext();

            var pendingBookings = db.Bookings
                 .Join(db.Rooms, b => b.RoomId, r => r.RoomId, (b, r) => new { b, r })
                 .Join(db.PgProperties, br => br.r.PgId, pg => pg.PgId, (br, pg) => new { br.b, br.r, pg })
                 .Where(x => x.pg.OwnerId == ownerId && x.b.BookingStatus == "Pending")
                 .Select(x => new OwnerBookingDTO
                 {
                     BookingId = x.b.BookingId,
                     TenantId = x.b.TenantId,
                     RoomId = x.b.RoomId,
                     BookDate = x.b.BookDate,
                     StartDate = x.b.StartDate,
                     EndDate = x.b.EndDate,
                     BookingStatus = x.b.BookingStatus
                 })
                 .ToList();


            if (!pendingBookings.Any())
                return Ok("No pending booking requests.");

            return Ok(pendingBookings);
        }


        [HttpPut("bookings/{bookingId}/update-status")]
        public ActionResult UpdateBookingStatus(int bookingId, [FromBody] BookingStatusUpdateDTO dto, int ownerId)
        {
            using var db = new NexthomeContext();
            var booking = db.Bookings
                .Join(db.Rooms, b => b.RoomId, r => r.RoomId, (b, r) => new { b, r })
                .Join(db.PgProperties, br => br.r.PgId, pg => pg.PgId, (br, pg) => new { br.b, br.r, pg })
                .FirstOrDefault(x => x.b.BookingId == bookingId && x.pg.OwnerId == ownerId);

            if (booking == null)
                return NotFound("Booking not found or you do not have permission.");
            if (dto.NewStatus != "Approved" && dto.NewStatus != "Rejected")
                return BadRequest("Invalid status.");
            booking.b.BookingStatus = dto.NewStatus;

            db.SaveChanges();

            return Ok($"Booking {bookingId} has been {dto.NewStatus}.");
        }


        [HttpGet("state")]
        public IEnumerable<StateDTO> GetState()
        {
            using var db = new NexthomeContext();
            var states = db.States
                           .Select(s => new StateDTO
                           {
                               Sid = s.Sid,
                               Sname = s.Sname
                           })
                           .ToList();

            return states;
        }

        [HttpGet("cities")]
        public IEnumerable<CityDTO> GetCities([FromQuery] int stateId)
        {
            using var db = new NexthomeContext();

            return db.Cities
                     .Where(c => c.Sid == stateId)
                     .Select(c => new CityDTO
                     {
                         CityId = c.CityId,
                         CityName = c.CityName,
                         Sid = c.Sid
                     })
                     .ToList();
        }

        [HttpGet("areas")]
        public IEnumerable<AreaDTO> GetAreas(int cityId)
        {
            using var db = new NexthomeContext();

            return db.Areas
                     .Where(a => a.CityId == cityId)
                     .Select(a => new AreaDTO
                     {
                         AreaId = a.AreaId,
                         CityId = a.CityId,
                         AreaName = a.AreaName
                     })
                     .ToList();
        }





    }

}
