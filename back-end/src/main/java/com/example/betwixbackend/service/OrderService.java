package com.example.betwixbackend.service;

import java.util.List;

import  com.example.betwixbackend.dto.OrderDTO;
import com.example.betwixbackend.dto.OrderItemDTO;
import com.example.betwixbackend.dto.OrderUpdateDTO;

import java.util.Optional;
import java.util.Set;
import java.util.Date;
import java.util.HashSet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.betwixbackend.entity.OrderItem;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.repository.OrderItemRepository;
import com.example.betwixbackend.repository.OrderRepository;
import com.example.betwixbackend.repository.UserRepository;
import com.example.betwixbackend.enums.OrderStatus;
@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private OrderItemsService orderItemsService;
	
	@Autowired
	private UserRepository userRepository;
	public List<Order> findAll(){
		return repository.findAll();
	}
	
	public Order findById(String id) {
		Optional<Order> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException("None entity with id: " + id + " was found!"));
	}
	
	public String registerOrder(OrderDTO orderDto) {
		Order order = new Order();
		Optional<User> myClient =  userRepository.findById(orderDto.getClient());
		 Set<OrderItem> orderItems = new HashSet<>();
	        for (OrderItemDTO orderItemDTO : orderDto.getItems()) {
	          //  OrderItem orderItem = orderItemRepository.findById(orderItemDTO.getId())
	            //        .orElseThrow(() -> new RuntimeException("Order item not found: " + orderItemDTO.getId()));
	        	OrderItem orderItem = orderItemsService.registerOrder(orderItemDTO);
	        	orderItems.add(orderItem);
	        }
    	order.setClient(myClient.get());
        order.setOrderStatus(OrderStatus.WAITING_PAYMENT);
        order.setTypeDePayement(orderDto.getTypeDePayement());
        order.setItems(orderItems);
        order.setCreatedAt(new Date());
        repository.save(order);
        return "order set succes";
	}

	public Order UpdateOrder(OrderUpdateDTO order) {
		// TODO Auto-generated method stub
		Optional<Order> lastorder = repository.findById(order.getId());
		lastorder.get().setOrderStatus(order.getOrderStatus());
		return repository.save(lastorder.get());
	}
}