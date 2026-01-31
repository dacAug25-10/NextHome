package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	
	 @Autowired
	    private UserRepository userRepository;

	    private static final long OWNER_ROLE_ID = 2;

	    // Get all owners
	    public List<User> getAllOwners() {
	        return userRepository.findByRoleId(OWNER_ROLE_ID);
	    }
}
