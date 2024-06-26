package com.example.betwixbackend.service;

import java.util.List;

import  com.example.betwixbackend.dto.OrderDTO;
import com.example.betwixbackend.dto.OrderItemDTO;

import java.util.Optional;
import java.util.Set;
import java.util.HashSet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.betwixbackend.entity.OrderItem;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.repository.OrderItemRepository;
import com.example.betwixbackend.repository.OrderRepository;
import com.example.betwixbackend.repository.ProductRepository;
import com.example.betwixbackend.repository.UserRepository;
import com.example.betwixbackend.enums.OrderStatus;
@Service
public class OrderItemsService {

	
	@Autowired
	private OrderItemRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	public List<OrderItem> findAll(){
		return repository.findAll();
	}
	
	public OrderItem findById(String id) {
		Optional<OrderItem> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException("None entity with id: " + id + " was found!"));
	}
	
	public OrderItem registerOrder(OrderItemDTO orderDto) {
		OrderItem orderitem = new OrderItem();
		Optional<Product> product =  productRepository.findById(orderDto.getProduit());
		orderitem.setProduct(product.get());
		orderitem.setPrice(orderDto.getPrice());
        orderitem.setQuantity(orderDto.getQuantity());
        repository.save(orderitem);
        return orderitem;
	}
}