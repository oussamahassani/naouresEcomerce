package com.example.betwixbackend.dto;

import com.example.betwixbackend.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

	
	 private String name;
	    private String description;
	    private Double price;
	 //   private String imgUrl;

	    private String category ;
}
