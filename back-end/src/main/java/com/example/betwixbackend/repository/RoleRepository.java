package com.example.betwixbackend.repository;

import com.example.betwixbackend.entity.Role;
import com.example.betwixbackend.enums.RoleEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role>findByName(RoleEnum name);
}
