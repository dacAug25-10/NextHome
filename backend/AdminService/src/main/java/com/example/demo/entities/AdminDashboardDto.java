package com.example.demo.entities;

public class AdminDashboardDto {

    private long totalOwners;
    private long totalTenants;
    private long totalPg;
    private long pendingRequests;

    public AdminDashboardDto(long totalOwners, long totalTenants,
                             long totalPg, long pendingRequests) {
        this.totalOwners = totalOwners;
        this.totalTenants = totalTenants;
        this.totalPg = totalPg;
        this.pendingRequests = pendingRequests;
    }


    public long getTotalOwners() {
        return totalOwners;
    }

    public long getTotalTenants() {
        return totalTenants;
    }

    public long getTotalPg() {
        return totalPg;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }
}
