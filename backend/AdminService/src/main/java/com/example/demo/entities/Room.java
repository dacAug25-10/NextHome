package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "pg_id")
    private Long pgId; // FK to PG table

    @Column(name = "room_no")
    private String roomNo;

    @Column(name = "room_type")
    private String roomType; // Single / Double / Triple

    @Column(name = "total_bed")
    private int totalBed;

    @Column(name = "available_bed")
    private int availableBed;

    private String sharing; // 1, 2, 3 sharing etc

    @Column(name = "security_deposit")
    private double securityDeposit;

    private String status; 

    // Constructors
    public Room() {}

    // Getters & Setters
    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getPgId() {
        return pgId;
    }

    public void setPgId(Long pgId) {
        this.pgId = pgId;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getTotalBed() {
        return totalBed;
    }

    public void setTotalBed(int totalBed) {
        this.totalBed = totalBed;
    }

    public int getAvailableBed() {
        return availableBed;
    }

    public void setAvailableBed(int availableBed) {
        this.availableBed = availableBed;
    }

    public String getSharing() {
        return sharing;
    }

    public void setSharing(String sharing) {
        this.sharing = sharing;
    }

    public double getSecurityDeposit() {
        return securityDeposit;
    }

    public void setSecurityDeposit(double securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
