package com.example.betwixbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.betwixbackend.dto.OrderDTO;
import com.example.betwixbackend.dto.OrderUpdateDTO;
import com.example.betwixbackend.dto.RegisterRequest;
import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.enums.RoleEnum;
import com.example.betwixbackend.service.OrderService;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

	@Autowired
	private OrderService service;
	
	@GetMapping
	public ResponseEntity<List<Order>> findAll() {
		List<Order> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Order> findById(@PathVariable String id){
		Order obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	@PostMapping
	 public String  registerOrder(@RequestBody OrderDTO order) {

	        String resultregister =  service.registerOrder(order);


	    return resultregister;
	}
	  @PatchMapping
	    public ResponseEntity<Order> UpdateCategory(@RequestBody OrderUpdateDTO order) {
		  Order updateProduit = service.UpdateOrder(order);
	        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
	    }
	  
}
