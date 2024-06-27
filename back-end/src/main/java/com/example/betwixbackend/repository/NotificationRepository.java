package com.example.betwixbackend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.example.betwixbackend.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String>{

	List<Notification> findByRecipient(String id);

}
