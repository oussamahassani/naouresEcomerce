package com.example.betwixbackend.entity;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.MediaType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document
@Collation("pack")
@NoArgsConstructor
@Getter
@Setter
public class Pack {
	  @Id
	private String id;
    private String namePack;
    private String image;
    private String price ;
    private String discription ;
    
}
