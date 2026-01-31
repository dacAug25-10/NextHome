package com.example.demo.service;

import com.example.demo.entities.Pgproperty;
import com.example.demo.repository.PgRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PgpropertyService {

  

	 @Autowired
	 private PgRepository pgRepository;
	 
	    public List<Pgproperty> getAllPg() {
	        return pgRepository.findAll();
	    }

}
