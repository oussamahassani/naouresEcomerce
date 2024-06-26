package com.example.betwixbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.betwixbackend.enums.RoleEnum;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Document
@Collation("Reclamation")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
public class Reclamation {

	   @Id
	    private String id;
	   
	@CreatedDate
	private Date createdDate;
	
    private String idUser;
    private boolean treated; //traiter ou non par l'admin

    private LocalDateTime dateModification;

    private String description;



}
