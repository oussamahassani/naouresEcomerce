package com.example.betwixbackend.service;

import com.example.betwixbackend.entity.Complaint;
import com.example.betwixbackend.repository.ComplaintRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint submitComplaint(Complaint complaint) {
        complaint.setSubmittedDate(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

}
