package com.nexthome.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nexthome.admin.entity.Admin;
import com.nexthome.admin.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin request) {
        Admin admin = adminService.login(
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(admin);
        
    }
    
    //Pending
    @GetMapping("/pg/pending")
    public ResponseEntity<?> getPendingPgs() {
        return ResponseEntity.ok(adminService.getPendingPgProperties());
    }
    
    //Approve
    @PutMapping("/pg/{id}/approve")
    public ResponseEntity<?> approvePg(@PathVariable Integer id) {
        return ResponseEntity.ok(adminService.approvePg(id));
    }
    
    //Reject
    @PutMapping("/pg/{id}/reject")
    public ResponseEntity<?> rejectPg(@PathVariable Integer id) {
        return ResponseEntity.ok(adminService.rejectPg(id));
    }
    
    //Booking
    @GetMapping("/bookings")
    public ResponseEntity<?> viewAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }
    
    //Feedback
    @GetMapping("/feedback")
    public ResponseEntity<?> viewAllFeedback() {
        return ResponseEntity.ok(adminService.getAllFeedback());
    }


}
