package com.example.demo.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long User_id;

    @Column(name = "role_id")
    private Long roleId;

    private String name;
    private String email;
    private String phone;
    private String password;

    private LocalDateTime created_at;

    private String status; // e.g., ACTIVE, INACTIVE

    // Constructors
    public User() {}

    public User(Long roleId, String name, String email, String phone, String password, LocalDateTime createdAt, String status) {
        this.roleId = roleId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.created_at = createdAt;
        this.status = status;
    }

    // Getters & Setters
    public Long getUserId() { return User_id; }
    public void setUserId(Long userId) { this.User_id = userId; }

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDateTime getCreatedAt() { return created_at; }
    public void setCreatedAt(LocalDateTime createdAt) { this.created_at = createdAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
