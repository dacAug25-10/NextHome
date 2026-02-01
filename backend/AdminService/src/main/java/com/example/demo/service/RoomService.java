package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Room;
import com.example.demo.repository.RoomRepository;

@Service
public class RoomService {

	 @Autowired
	 private RoomRepository roomRepository;
	 
	 
	 public List<Room> getAllAvailableRooms() {
		    return roomRepository.findByStatus("Available");
		}
}
