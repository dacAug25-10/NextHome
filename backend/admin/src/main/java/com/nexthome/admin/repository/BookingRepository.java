package com.nexthome.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexthome.admin.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
