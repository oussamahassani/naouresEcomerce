package com.example.betwixbackend.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.betwixbackend.entity.Product;

public interface ProductRepository extends  MongoRepository<Product, Long>{

	boolean existsById(String id);
	void deleteById(String id);
	Optional<Product> findById(String id);
	List<Product> findByCategory(ObjectId id);
	
	@Query("{ 'price' : { $lte: ?0 } }")
	List<Product> findByPriceGreaterThanEqual(int i);
}
