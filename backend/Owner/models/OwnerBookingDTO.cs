//public class OwnerBookingDTO
//{
//    public int BookingId { get; set; }
//    public int? TenantId { get; set; }       
//    public int? RoomId { get; set; }
//    public DateOnly? BookDate { get; set; }  
//    public DateOnly? StartDate { get; set; }
//    public DateOnly? EndDate { get; set; }
//    public  string BookingStatus { get; set; }=string.Empty;
//}
public class OwnerBookingDTO
{
    public int BookingId { get; set; }

    // Tenant
    public int? TenantId { get; set; }
    public string? TenantName { get; set; } = string.Empty; // optional if you have tenant table

    // PG & Room
    public int? PgId { get; set; }
    public string? PgName { get; set; } = string.Empty;
    public int? RoomId { get; set; }
    public string? RoomNo { get; set; } = string.Empty;

    // Booking info
    public DateOnly? BookDate { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }

    public decimal? RentAmount { get; set; }
    public string? BookingStatus { get; set; } = string.Empty;
}
