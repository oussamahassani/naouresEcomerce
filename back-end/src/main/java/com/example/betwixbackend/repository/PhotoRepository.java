package com.example.betwixbackend.repository;

import com.example.betwixbackend.entity.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoRepository extends MongoRepository<Photo, String> { }
