package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Feedback;
import com.example.demo.entities.Pgproperty;
import com.example.demo.entities.Room;
import com.example.demo.entities.User;
import com.example.demo.service.FeedbackService;
import com.example.demo.service.PgpropertyService;
import com.example.demo.service.RoomService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class NexthomeController {

	 @Autowired
	    private UserService userService;
	 
	 @Autowired
	 private PgpropertyService pgService;
	 
	 @Autowired
	 private RoomService roomService;
	 
	 @Autowired
	 private FeedbackService feedbackService;

	    // Get all owners
	    @GetMapping("/getowners")
	    public ResponseEntity<List<User>> getAllOwners() {
	        List<User> owners = userService.getAllOwners();
	        return ResponseEntity.ok(owners);
	    }
	    
	    @GetMapping("/getAllpg")
	    public List<Pgproperty> getAllPg() {
	        return pgService.getAllPg();
	    }
	    
	    @GetMapping("/available")
	    public List<Room> getAllAvailableRooms() {
	        return roomService.getAllAvailableRooms();
	    }
	    
	    @GetMapping("gelAllFeed")
	    public List<Feedback> getAllFeedback() {
	        return feedbackService.getAllFeedback();
	    }
}
