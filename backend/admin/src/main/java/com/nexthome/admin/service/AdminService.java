package com.nexthome.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexthome.admin.entity.Admin;
import com.nexthome.admin.entity.Booking;
import com.nexthome.admin.entity.Feedback;
import com.nexthome.admin.entity.PgProperty;
import com.nexthome.admin.repository.AdminRepository;
import com.nexthome.admin.repository.BookingRepository;
import com.nexthome.admin.repository.FeedbackRepository;
import com.nexthome.admin.repository.PgPropertyRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return admin;
    }
    
    @Autowired
    private PgPropertyRepository pgPropertyRepository;

    // Get all pending PGs
    public List<PgProperty> getPendingPgProperties() {
        return pgPropertyRepository.findByStatus("PENDING");
    }

    // Approve PG
    public PgProperty approvePg(Integer pgId) {
        PgProperty pg = pgPropertyRepository.findById(pgId)
                .orElseThrow(() -> new RuntimeException("PG not found"));
        pg.setStatus("APPROVED");
        return pgPropertyRepository.save(pg);
    }

    // Reject PG
    public PgProperty rejectPg(Integer pgId) {
        PgProperty pg = pgPropertyRepository.findById(pgId)
                .orElseThrow(() -> new RuntimeException("PG not found"));
        pg.setStatus("REJECTED");
        return pgPropertyRepository.save(pg);
    }
    
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }



}
