package com.example.betwixbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.example.betwixbackend.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String>{

}
