package com.nexthome.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexthome.admin.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}
