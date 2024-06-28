package com.example.betwixbackend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.betwixbackend.entity.Reclamation;
import com.example.betwixbackend.entity.UserPayement;
@Repository
public interface UserPayementRepository  extends MongoRepository<UserPayement , String> {

	List<UserPayement> findByUserid(String id);

	List<UserPayement> findByProductId_id(String id);

	List<UserPayement> findTop5ByOrderByIdDesc();

}
