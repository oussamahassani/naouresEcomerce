package com.example.betwixbackend.repository;

import com.example.betwixbackend.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComplaintRepository  extends MongoRepository<Complaint, String> {
}
