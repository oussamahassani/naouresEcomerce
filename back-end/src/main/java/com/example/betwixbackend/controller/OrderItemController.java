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
import com.example.betwixbackend.dto.OrderItemDTO;
import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.entity.OrderItem;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.service.OrderItemsService;
import com.example.betwixbackend.service.OrderService;

@RestController
@RequestMapping(value = "/ordersItems")
public class OrderItemController {
	@Autowired
	private OrderItemsService service;
	
	
	
	@GetMapping
	public ResponseEntity<List<OrderItem>> findAll() {
		List<OrderItem> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<OrderItem> findById(@PathVariable String id){
		OrderItem obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PostMapping
	 public OrderItem  registerOrder(@RequestBody OrderItemDTO order) {

		OrderItem resultregister =  service.registerOrder(order);


	    return resultregister;
	}
}
