package com.example.betwixbackend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Pack;
import com.example.betwixbackend.entity.Product;

public  interface   PackRepository extends MongoRepository<Pack,String>{

	boolean existsById(String id);

	void deleteById(String id);

	Optional<Pack> findById(String id);
}
