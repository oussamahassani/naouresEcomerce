package com.example.betwixbackend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Getter
@Setter
@Document
@Collation("Reclamation")
@NoArgsConstructor
public class Complaint {

    @Id
    private String id;
    private String reason; // Main reason for the complaint
    private String description; // Optional: Detailed description of the complaint
    private LocalDateTime submittedDate;
}
