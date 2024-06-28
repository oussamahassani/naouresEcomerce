package com.example.betwixbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.betwixbackend.entity.Notification;
import com.example.betwixbackend.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable String id) {
        return notificationService.findById(id)
                .map(notification -> ResponseEntity.ok(notification))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/notifByUser/{id}")
    public List<Notification> getNotificationByUserId(@PathVariable String id) {
        return notificationService.findByUserId(id);
               
    }
    @GetMapping("/notifReadAllByUser/{id}")
    public List<Notification> notifReadAllByUser(@PathVariable String id) {
        return notificationService.findByUserIdAndChangeRead(id);
               
    }
    
    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.save(notification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable String id, @RequestBody Notification updatedNotification) {
        return notificationService.findById(id)
                .map(notification -> {
                    notification.setMessage(updatedNotification.getMessage());
                    notification.setSender(updatedNotification.getSender());
                    notification.setRecipient(updatedNotification.getRecipient());
                    notification.setTimestamp(updatedNotification.getTimestamp());
                    Notification savedNotification = notificationService.save(notification);
                    return ResponseEntity.ok(savedNotification);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        if (notificationService.findById(id).isPresent()) {
            notificationService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
