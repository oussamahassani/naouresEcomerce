package com.example.betwixbackend.controller;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.betwixbackend.dto.CreatePostDto;
import  com.example.betwixbackend.entity.Post ;
import com.example.betwixbackend.service.PostService;

import lombok.AllArgsConstructor;



@RestController 
@RequestMapping("/posts")
public class PostController 
{ 
	@Autowired
	private PostService postService;
	
	private static final String ID = "/{id}";
	
	@PostMapping
	public ResponseEntity<Post> createPost(@RequestParam(required = false) String title ,@RequestParam(required = false) String postContent ,
			@RequestParam(required = false) MultipartFile imgUrl)
	{
		Post post = this.postService.create(title , postContent, imgUrl);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID).buildAndExpand(post.getPkPost()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping
	public ResponseEntity<Post> editPost(@RequestBody CreatePostDto createPostDto)
	{
		Post editPost = this.postService.edit(createPostDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(editPost);
	}
	
	@GetMapping
	public ResponseEntity<List<Post>> findAll()
	{
		return ResponseEntity.status(HttpStatus.OK).body(this.postService.findAll());
	}
	

	
	@GetMapping("/{id}")
	public ResponseEntity<Post> findById(@PathVariable Long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(this.postService.findById(id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Post> deleteById(@PathVariable Long id)
	{
		this.postService.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
}