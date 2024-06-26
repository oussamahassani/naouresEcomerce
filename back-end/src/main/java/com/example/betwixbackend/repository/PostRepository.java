package com.example.betwixbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Post;

public interface PostRepository  extends MongoRepository<Post, Long>{

}
