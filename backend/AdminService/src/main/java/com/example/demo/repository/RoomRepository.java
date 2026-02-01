package com.example.demo.repository;

import com.example.demo.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByPgId(Long pgId);

    List<Room> findByStatus(String status);

    List<Room> findByPgIdAndStatus(Long pgId, String status);
}
