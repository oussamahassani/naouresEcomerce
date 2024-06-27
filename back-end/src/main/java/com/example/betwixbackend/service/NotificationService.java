package com.example.betwixbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.betwixbackend.entity.Notification;
import com.example.betwixbackend.repository.NotificationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> findById(String id) {
        return notificationRepository.findById(id);
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteById(String id) {
        notificationRepository.deleteById(id);
    }

	public List<Notification> findByUserId(String id) {
		// TODO Auto-generated method stub
		return notificationRepository.findByRecipient(id);
	}
}

