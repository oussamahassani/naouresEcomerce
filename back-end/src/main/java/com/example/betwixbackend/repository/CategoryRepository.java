package com.example.betwixbackend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Category;
public interface CategoryRepository extends MongoRepository<Category, Long>{

	boolean existsById(String id);

	void deleteById(String id);

	Optional<Category> findById(String id);

}
