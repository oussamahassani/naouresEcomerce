package com.example.betwixbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.entity.Pack;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.service.PackService;

@RestController
@RequestMapping(value = "/pack")
public class PackController {

@Autowired
	private PackService service;



@GetMapping
public ResponseEntity<List<Pack>> findAll() {
	List<Pack> list = service.findAll();
	return ResponseEntity.ok().body(list);
}

@GetMapping(value = "/{id}")
public ResponseEntity<Pack> findById(@PathVariable String id){
	Pack obj = service.findById(id);
	return ResponseEntity.ok().body(obj);
}


@PostMapping( consumes = MediaType.ALL_VALUE)
public ResponseEntity<Pack> createProduct(@RequestParam(required = false)  String namePack ,
		@RequestParam(required = false)  String price, @RequestParam MultipartFile photoPack) {
	Pack createdProduct = service.createPack(namePack,price ,photoPack );
 
    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
}
@PatchMapping
public ResponseEntity<Pack> UpdatePack(@RequestBody Pack pack) {
	Pack updatePack = service.UpdatePack(pack);
    return new ResponseEntity<Pack>(updatePack, HttpStatus.CREATED);
}
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteProduct(@PathVariable("id") String id) {
    try {
        // Call the service method to delete the product
    	service.deletePackById(id);
        return new ResponseEntity<>("Pack deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>("Failed to delete product", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
