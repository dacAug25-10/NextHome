package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NexthomeController {

	 @Autowired
	    private UserService userService;

	    // Get all owners
	    @GetMapping("/getowners")
	    public ResponseEntity<List<User>> getAllOwners() {
	        List<User> owners = userService.getAllOwners();
	        return ResponseEntity.ok(owners);
	    }
}
