package com.example.betwixbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Order;

public interface  OrderRepository extends MongoRepository<Order,String>{

	Order findOrderByClickToPayOrder(String clickToPayOrder);

}
