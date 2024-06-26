package com.example.betwixbackend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Category;
import com.example.betwixbackend.entity.Roulette;
public interface RouletteRepository extends MongoRepository<Roulette, Long>{

	boolean existsById(int id);

	void deleteById(int id);

	Optional<Roulette> findById(int id);

	

}