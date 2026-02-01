package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Feedback;
import com.example.demo.repository.FeedbackRepository;

@Service
public class FeedbackService {
	
	@Autowired
	
	private FeedbackRepository feedbackRepository;
	 public List<Feedback> getAllFeedback() {
	        return feedbackRepository.findAll();
	    }
}
