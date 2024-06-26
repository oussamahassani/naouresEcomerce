package com.example.betwixbackend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.entity.OrderItem;

public interface OrderItemRepository extends  MongoRepository<OrderItem, Long>{

	Optional<OrderItem> findById(String id);

}