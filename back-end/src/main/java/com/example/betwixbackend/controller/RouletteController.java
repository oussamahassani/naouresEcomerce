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

import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.Roulette;
import com.example.betwixbackend.service.RouletteRandomService;

@RestController
@RequestMapping(value = "/roullete")
public class RouletteController {

    @Autowired
    private RouletteRandomService randomService;

    @GetMapping(value = "/getData/{id}")
    public Roulette getSomething(@PathVariable int id){
        return randomService.getRandom(id);
    }
    @GetMapping(value = "/getALL")
    public List<Roulette> getAll(){
        return randomService.getALL();
    }
    
    @PostMapping( consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Roulette> createRoulette(@RequestParam(required = false)  String fillStyle ,
    		@RequestParam(required = false)  String text, @RequestParam String textFillStyle , String textFontSize) {
    	Roulette createdProduct = randomService.createRoulette(fillStyle,text,textFillStyle ,textFontSize );
     
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }
    @PatchMapping
    public ResponseEntity<Roulette> UpdateRoulette(@RequestBody Roulette roulette) {
    	Roulette updateProduit = randomService.UpdateRoulette(roulette);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoulette(@PathVariable("id") int id) {
        try {
            // Call the service method to delete the product
        	randomService.deleteRouletteById(id);
            return new ResponseEntity<>("roulette deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete roulette", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
