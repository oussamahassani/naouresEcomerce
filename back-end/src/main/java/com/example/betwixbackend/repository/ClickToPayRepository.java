package com.example.betwixbackend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.betwixbackend.entity.ClickToPay;

@Repository
public interface ClickToPayRepository extends MongoRepository<ClickToPay, String> {

	ClickToPay findOderByOrderId(String orderId);

	List<ClickToPay> findOderByIdUser(String id);

    @Query(value = "{ 'errorCode' : 200 }", count = true)
	int countsuccessPayement();
}

