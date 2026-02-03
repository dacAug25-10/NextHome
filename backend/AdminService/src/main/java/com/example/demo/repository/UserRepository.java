package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
 
	
	List<User> findByRoleId(Long roleId);
	
	 
    List<User> findByRoleIdAndStatus(Long roleId, String status);
    List<User> findByRoleIdAndStatusIsNotNull(Long roleId);

 
    long countByRoleId(Long roleId);

    long countByRoleIdAndStatus(Long roleId, String status);
}
