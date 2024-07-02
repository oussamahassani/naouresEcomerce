package com.example.betwixbackend.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;


import lombok.*;


@Document
@Collation("Postes")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Post 
{
	 @Id
	@EqualsAndHashCode.Include

	private String pkPost;
	

	
	private String postContent;
	
	private String title;
	
    private String imgUrl;
    private String author = "system";
    
    @CreatedDate
    private Date date;
	
	@JsonSerialize(using = LocalDateTimeSerializer.class)

	private LocalDateTime updateDate;
}
