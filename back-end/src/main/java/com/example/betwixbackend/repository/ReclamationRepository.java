package com.example.betwixbackend.repository;

import com.example.betwixbackend.dto.CountByYearAndMonthDTO;
import com.example.betwixbackend.entity.Reclamation;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ReclamationRepository extends MongoRepository<Reclamation, String> {

	List<Reclamation> findByIdUser(String id);

	List<Reclamation> findTop5ByOrderByIdDesc();
	
    @Aggregation("{ $group: { _id: { year: { $year: '$createdDate' }, month: { $month: '$createdDate' } }, count: { $sum: 1 },"
    		+ "createdDate: {$first: '$createdDate'} "
    		
    		+ " } }")
	    List<CountByYearAndMonthDTO> countByYearAndMonth();

}
