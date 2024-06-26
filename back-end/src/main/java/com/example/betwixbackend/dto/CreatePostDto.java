package com.example.betwixbackend.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostDto 
{
	private Long pkPost;
	
	@NotBlank(message = "Enter post content")
	private String postContent;
	
	@NotBlank(message = "Enter title content")
	private String title;
}