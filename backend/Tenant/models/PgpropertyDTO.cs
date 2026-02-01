namespace Tenant.models
{
    public class PgPropertyDTO
    {
        public int PgId { get; set; }
        public string? PgName { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public int? Rent { get; set; }
        public string? Facility { get; set; }
        public string? Status { get; set; }
        public int OwnerId { get; set; }

        // Location info
        public int? AreaId { get; set; }
        public string? AreaName { get; set; }

        // Rooms
        public List<RoomDTO> Rooms { get; set; } = new List<RoomDTO>();
    }

    public class RoomDTO
    {
        public int RoomId { get; set; }
        public string RoomNo { get; set; } = null!;
        public string? RoomType { get; set; }
        public int? TotalBed { get; set; }
        public int? AvailableBed { get; set; }
        public int? Sharing { get; set; }
        public int? SecurityDeposit { get; set; }
        public string? Status { get; set; }
    }
}
