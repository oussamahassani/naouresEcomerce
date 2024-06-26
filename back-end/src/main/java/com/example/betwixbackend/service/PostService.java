package com.example.betwixbackend.service;



import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.dto.CreatePostDto;
import com.example.betwixbackend.entity.Post;
import com.example.betwixbackend.repository.PostRepository;

import lombok.AllArgsConstructor;
import utils.Utils;



@Service
public class PostService 
{
    private static final Logger logger = LogManager.getLogger(UserIService.class);
	
    @Autowired
	private PostRepository postRepository;
	
    @Value("${pathUser}")
    private String pathUser;

	public List<Post> findAll()
	{
		return postRepository.findAll();
	}
	

	
	public Post findById(Long id)
	{
		Optional<Post>  findedPost= this.postRepository.findById(id) ;
		return findedPost.get();
	}
	
	
	
	

	@Transactional
	public void deleteById(Long id)
	{
		
		
		postRepository.deleteById(id);
	}



	public Post create(String title ,String postContent , MultipartFile imgUrl) {
		// TODO Auto-generated method stub
		Post newpost = new Post();
		 if (!imgUrl.isEmpty()) {
	            try {
	                Utils.saveImage(imgUrl, pathUser,
	                        "");
	                newpost.setImgUrl( Utils.noSpecialCharacters(imgUrl.getOriginalFilename()));
	            } catch (Exception e) {
	                logger.error("user Exception: "
	                        + e.getMessage());

	            }
	        }
		 newpost.setTitle(title);
		 newpost.setPostContent(postContent);
		return postRepository.save(newpost);
	}



	public Post edit(CreatePostDto createPostDto) {
		// TODO Auto-generated method stub
		return null;
	}
}