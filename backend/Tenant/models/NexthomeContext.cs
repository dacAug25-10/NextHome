using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Tenant.models;

public partial class NexthomeContext : DbContext
{
    public NexthomeContext()
    {
    }

    public NexthomeContext(DbContextOptions<NexthomeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Complaint> Complaints { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PgProperty> PgProperties { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Alpesh@5211;database=nexthome", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PRIMARY");

            entity.ToTable("booking");

            entity.HasIndex(e => e.RoomId, "fk_room_room_idx");

            entity.HasIndex(e => e.TenantId, "fk_tenant_user_idx");

            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.BookDate).HasColumnName("book_date");
            entity.Property(e => e.BookingStatus)
                .HasMaxLength(45)
                .HasColumnName("booking_status");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.RentAmount).HasColumnName("rent_amount");
            entity.Property(e => e.RoomId).HasColumnName("room_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.TenantId).HasColumnName("tenant_id");

            entity.HasOne(d => d.Room).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_room_room");

            entity.HasOne(d => d.Tenant).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.TenantId)
                .HasConstraintName("fk_tenant_user");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PRIMARY");

            entity.ToTable("city");

            entity.HasIndex(e => e.Sid, "fk_sid_state_idx");

            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CityName)
                .HasMaxLength(45)
                .HasColumnName("city_name");
            entity.Property(e => e.Sid).HasColumnName("sid");

            entity.HasOne(d => d.SidNavigation).WithMany(p => p.Cities)
                .HasForeignKey(d => d.Sid)
                .HasConstraintName("fk_sid_state");
        });

        modelBuilder.Entity<Complaint>(entity =>
        {
            entity.HasKey(e => e.ComplaintId).HasName("PRIMARY");

            entity.ToTable("complaint");

            entity.HasIndex(e => e.PgId, "fk_pgid_property_idx");

            entity.HasIndex(e => e.TenantId, "fk_tenantid_user_idx");

            entity.Property(e => e.ComplaintId).HasColumnName("complaint_id");
            entity.Property(e => e.ComplaintAt)
                .HasColumnType("datetime")
                .HasColumnName("complaint_at");
            entity.Property(e => e.Message)
                .HasMaxLength(100)
                .HasColumnName("message");
            entity.Property(e => e.PgId).HasColumnName("pg_id");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.TenantId).HasColumnName("tenant_id");

            entity.HasOne(d => d.Pg).WithMany(p => p.Complaints)
                .HasForeignKey(d => d.PgId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_pgid_property");

            entity.HasOne(d => d.Tenant).WithMany(p => p.Complaints)
                .HasForeignKey(d => d.TenantId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_tenantid_user");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.HasIndex(e => e.PgId, "fk_pgid_property_idx");

            entity.HasIndex(e => e.TenantId, "fk_tenantid_user_idx");

            entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");
            entity.Property(e => e.Comment)
                .HasMaxLength(100)
                .HasColumnName("comment");
            entity.Property(e => e.PgId).HasColumnName("pg_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.TenantId).HasColumnName("tenant_id");

            entity.HasOne(d => d.Pg).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.PgId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_pgidfeed_property");

            entity.HasOne(d => d.Tenant).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.TenantId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_tenantFeed_user");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.BookingId, "fk_booking_id_booking_idx");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.PaymentMode)
                .HasMaxLength(45)
                .HasColumnName("payment_mode");
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(45)
                .HasColumnName("payment_status");

            entity.HasOne(d => d.Booking).WithMany(p => p.Payments)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_booking_id_booking");
        });

        modelBuilder.Entity<PgProperty>(entity =>
        {
            entity.HasKey(e => e.PgId).HasName("PRIMARY");

            entity.ToTable("pg_property");

            entity.HasIndex(e => e.Address, "fk_location_location_idx");

            entity.HasIndex(e => e.OwnerId, "fk_owner_user_idx");

            entity.Property(e => e.PgId).HasColumnName("pg_id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasColumnName("description");
            entity.Property(e => e.Facility)
                .HasMaxLength(45)
                .HasColumnName("facility");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.PgName)
                .HasMaxLength(45)
                .HasColumnName("pg_name");
            entity.Property(e => e.Rent).HasColumnName("rent");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.Type)
                .HasMaxLength(45)
                .HasColumnName("type");

            entity.HasOne(d => d.AddressNavigation).WithMany(p => p.PgProperties)
                .HasForeignKey(d => d.Address)
                .HasConstraintName("fk_address_city");

            entity.HasOne(d => d.Owner).WithMany(p => p.PgProperties)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("fk_owner_user");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(45)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PRIMARY");

            entity.ToTable("room");

            entity.HasIndex(e => e.PgId, "fk_pgid_room_idx");

            entity.Property(e => e.RoomId).HasColumnName("room_id");
            entity.Property(e => e.AvailableBed).HasColumnName("available_bed");
            entity.Property(e => e.PgId).HasColumnName("pg_id");
            entity.Property(e => e.RoomNo)
                .HasMaxLength(45)
                .HasColumnName("room_no");
            entity.Property(e => e.RoomType)
                .HasMaxLength(45)
                .HasColumnName("room_type");
            entity.Property(e => e.SecurityDeposit).HasColumnName("security_deposit");
            entity.Property(e => e.Sharing).HasColumnName("sharing");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
            entity.Property(e => e.TotalBed).HasColumnName("total_bed");

            entity.HasOne(d => d.Pg).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.PgId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_pgid_room");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Sid).HasName("PRIMARY");

            entity.ToTable("state");

            entity.Property(e => e.Sid).HasColumnName("sid");
            entity.Property(e => e.Sname)
                .HasMaxLength(45)
                .HasColumnName("sname");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.RoleId, "fk_user_role_idx");

            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(45)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(45)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_user_role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
