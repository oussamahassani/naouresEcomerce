package com.example.betwixbackend.repository;

import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.enums.RoleEnum;
import com.example.betwixbackend.service.ResourceNotFoundException;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<User , String> {
    Optional<User> findByEmail(String email);
    List<User> findByFirstName(String firstName);


    boolean existsByEmail(String email);

    boolean existsByRole(RoleEnum roleEnum);

    boolean existsByRoleAndEmail(RoleEnum roleEnum , String email);

    User findUsersByEmail(String currentUser);


    List<User> findAllByRole(String role);
}
