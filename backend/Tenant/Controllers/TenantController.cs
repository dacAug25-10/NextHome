using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tenant.models;
using System.Linq;

namespace Tenant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController : ControllerBase
    {
      
        [HttpGet("allpgs")]
        public IActionResult GetAllPGs()
        {
            var _context=new NexthomeContext();
            var pgs = _context.PgProperties
                .Include(p => p.Rooms)          // Include rooms
                .Include(p => p.Area)           // Include Area info
                .Select(p => new PgPropertyDTO
                {
                    PgId = p.PgId,
                    PgName = p.PgName,
                    Description = p.Description,
                    Type = p.Type,
                    Rent = p.Rent,
                    Facility = p.Facility,
                    Status = p.Status,
                    OwnerId = p.OwnerId,
                    AreaId = p.AreaId,
                    AreaName = p.Area != null ? p.Area.AreaName : null,
                    Rooms = p.Rooms.Select(r => new RoomDTO
                    {
                        RoomId = r.RoomId,
                        RoomNo = r.RoomNo,
                        RoomType = r.RoomType,
                        TotalBed = r.TotalBed,
                        AvailableBed = r.AvailableBed,
                        Sharing = r.Sharing,
                        SecurityDeposit = r.SecurityDeposit,
                        Status = r.Status
                    }).ToList()
                })
                .ToList();

            return Ok(pgs);
        }

        [HttpPost("book")]
        public IActionResult BookPG([FromBody] BookingRequestDTO request)
        {
            var _context=new NexthomeContext();
            // Check if room exists
            var room = _context.Rooms
                .Include(r => r.Pg) // optional, to get PG info
                .FirstOrDefault(r => r.RoomId == request.RoomId);

            if (room == null)
                return NotFound(new { message = "Room not found." });

            // Check if room has available beds
            if (room.AvailableBed.HasValue && room.AvailableBed.Value <= 0)
                return BadRequest(new { message = "No available beds in this room." });

         
            var booking = new Booking
            {
                RoomId = request.RoomId,
                TenantId = request.TenantId,
                BookDate = DateTime.UtcNow,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                RentAmount = request.RentAmount,
                BookingStatus = "Pending"
            };

            _context.Bookings.Add(booking);
            if (room.AvailableBed.HasValue)
                room.AvailableBed -= 1;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Booking request sent to owner.",
                bookingId = booking.BookingId
            });
        }


        [HttpGet("notifications/{tenantId}")]
        public IActionResult GetTenantNotifications(int tenantId)
        {
            using var db = new NexthomeContext();

            var notifications = db.Bookings
                .Where(b => b.TenantId == tenantId)
                .OrderByDescending(b => b.BookingId)
                .Select(b => new
                {
                    b.BookingId,
                    b.RoomId,
                    b.BookingStatus,
                    b.BookDate,
                    Message =
                        b.BookingStatus == "Approved"
                            ? "Your booking has been approved by the owner."
                        : b.BookingStatus == "Rejected"
                            ? "Your booking request was rejected."
                        : "Your booking request is pending approval."
                })
                .ToList();

            return Ok(notifications);
        }

        [HttpPost("pay")]
        public IActionResult MakePayment([FromBody] PaymentRequestDTO dto)
        {
            using var db = new NexthomeContext();

            var booking = db.Bookings.FirstOrDefault(b => b.BookingId == dto.BookingId);
            if (booking == null)
                return NotFound("Booking not found.");

            if (booking.BookingStatus != "Approved")
                return BadRequest("Payment allowed only after booking approval.");

            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                PaymentMode = dto.PaymentMode,
                PaymentStatus = "Completed"
            };

            db.Payments.Add(payment);
            db.SaveChanges();

            return Ok(new
            {
                message = "Payment successful",
                paymentId = payment.PaymentId
            });
        }
        [HttpPost("complaint")]
        public IActionResult RaiseComplaint([FromBody] ComplaintRequestDTO dto)
        {
            using var db = new NexthomeContext();

            var complaint = new Complaint
            {
                TenantId = dto.TenantId,
                PgId = dto.PgId,
                Message = dto.Message,
                Status = "Open",
                ComplaintAt = DateTime.UtcNow
            };

            db.Complaints.Add(complaint);
            db.SaveChanges();

            return Ok(new
            {
                message = "Complaint submitted successfully.",
                complaintId = complaint.ComplaintId
            });
        }
        [HttpPost("feedback")]
        public IActionResult AddFeedback([FromBody] FeedbackRequestDTO dto)
        {
            using var db = new NexthomeContext();

            var feedback = new Feedback
            {
                TenantId = dto.TenantId,
                PgId = dto.PgId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };

            db.Feedbacks.Add(feedback);
            db.SaveChanges();

            return Ok("Feedback submitted successfully.");
        }


    }
}
