package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pg_property")
public class Pgproperty {
	
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "pg_id")
	    private Long pgId;

	    @Column(name = "owner_id")
	    private Long ownerId;

	    @Column(name = "pg_name")
	    private String pgName;

	    private String description;

	    private String type; // Boys / Girls / Co-living

	    private double rent;

	    private String facility; // WiFi, Food, AC etc

	    private String status; // Available / Not Available

	    @Column(name = "area_id")
	    private Long areaId;

	    // Constructors
	    public Pgproperty() {}

	    // Getters & Setters
	    public Long getPgId() {
	        return pgId;
	    }

	    public void setPgId(Long pgId) {
	        this.pgId = pgId;
	    }

	    public Long getOwnerId() {
	        return ownerId;
	    }

	    public void setOwnerId(Long ownerId) {
	        this.ownerId = ownerId;
	    }

	    public String getPgName() {
	        return pgName;
	    }

	    public void setPgName(String pgName) {
	        this.pgName = pgName;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public String getType() {
	        return type;
	    }

	    public void setType(String type) {
	        this.type = type;
	    }

	    public double getRent() {
	        return rent;
	    }

	    public void setRent(double rent) {
	        this.rent = rent;
	    }

	    public String getFacility() {
	        return facility;
	    }

	    public void setFacility(String facility) {
	        this.facility = facility;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }

	    public Long getAreaId() {
	        return areaId;
	    }

	    public void setAreaId(Long areaId) {
	        this.areaId = areaId;
	    }
	
}
