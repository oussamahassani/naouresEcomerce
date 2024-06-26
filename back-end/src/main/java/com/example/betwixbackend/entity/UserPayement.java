package com.example.betwixbackend.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.betwixbackend.enums.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Document
@Collation("userpayement")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
public class UserPayement {
	 @Id
	    private String id;

	    private String userid;
	    private String firstName;
	    private String lastName;
	    private String genre;
	    private String tel;
	    private String payement ;
	    @CreatedDate
		private Date createdDate;
	
	    private Product productId ;

}
