package com.example.betwixbackend.repository;

import com.example.betwixbackend.entity.Reclamation;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReclamationRepository extends MongoRepository<Reclamation, String> {

	List<Reclamation> findByIdUser(String id);
}
