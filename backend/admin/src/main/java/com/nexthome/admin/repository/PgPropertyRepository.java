package com.nexthome.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexthome.admin.entity.PgProperty;

public interface PgPropertyRepository extends JpaRepository<PgProperty, Integer> {

    List<PgProperty> findByStatus(String status);
}
