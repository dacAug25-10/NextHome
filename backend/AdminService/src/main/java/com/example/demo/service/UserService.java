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
    private static final long TENANT_ROLE_ID = 3;

    public List<User> getAllTenants() {
        return userRepository.findByRoleId(TENANT_ROLE_ID);
    }
    public List<User> getAllOwners() {
        return userRepository.findByRoleId(OWNER_ROLE_ID);
    }

    public List<User> getPendingOwners() {
        return userRepository.findByRoleIdAndStatus(OWNER_ROLE_ID, "INACTIVE");
    }

    
    public User approveOwner(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("Active");
        return userRepository.save(user);
    }

    public long getTotalOwners() {
        return userRepository.countByRoleId(OWNER_ROLE_ID);
    }

    public long getTotalTenants() {
        return userRepository.countByRoleId(TENANT_ROLE_ID);
    }

    public long getPendingOwnerCount() {
        return userRepository.countByRoleIdAndStatus(OWNER_ROLE_ID, "INACTIVE");
    }
    
}
