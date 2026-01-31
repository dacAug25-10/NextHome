package com.example.demo.repository;

import com.example.demo.entities.Pgproperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PgRepository extends JpaRepository<Pgproperty, Long> {

    List<Pgproperty> findByStatus(String status);

    List<Pgproperty> findByAreaId(Long areaId);

    List<Pgproperty> findByRentLessThanEqual(double rent);
}
