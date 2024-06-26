package com.example.betwixbackend.service;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.entity.Pack;
import com.example.betwixbackend.repository.PackRepository;

import utils.Utils;

@Service
public class PackService {
	  private static final Logger logger = LogManager.getLogger(PackService.class);

	@Autowired
	private PackRepository repository;
	
	  @Value("${pathPack}")
	  private String pathPack;
	  
	public List<Pack> findAll() {
		// TODO Auto-generated method stub
		return  repository.findAll();
	}

	public Pack findById(String id) {
		// TODO Auto-generated method stub
		 Optional<Pack> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException("None entity with id: " + id + " was found!"));
	}

	public void deletePackById(String id) throws Exception {
		// TODO Auto-generated method stub
		 if (repository.existsById(id)) {
	            // If the product exists, delete it
			   repository.deleteById(id);
	        } else {
	            // If the product does not exist, throw an exception or handle the error accordingly
	            throw new Exception("Product with ID " + id + " not found");
	        }	
	}

	public Pack createPack(String namePack, String price, MultipartFile photoPack) {
		// TODO Auto-generated method stub
		Pack pack =  new Pack();

		if (!photoPack.isEmpty()) {
	          try {
	        	  Utils.saveImage(photoPack, pathPack,
	        			  "pack");
	        	  pack.setImage("pack"
	                + Utils.noSpecialCharacters(photoPack.getOriginalFilename()));
	          } catch (Exception e) {
	            logger.error("pack Exception: "
	                + e.getMessage());

	          }
	        }
		pack.setPrice(price);
		pack.setNamePack(namePack);
		repository.save(pack);
		return pack;
	}

	public Pack UpdatePack(Pack pack) {
		// TODO Auto-generated method stub
		return repository.save(pack);
	}

}
