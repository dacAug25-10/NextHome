package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Feedback;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Get all feedback for a specific PG
    List<Feedback> findByPgId(Long pgId);

    // Get all feedback for a specific tenant
    List<Feedback> findByTenantId(Long tenantId);
}
