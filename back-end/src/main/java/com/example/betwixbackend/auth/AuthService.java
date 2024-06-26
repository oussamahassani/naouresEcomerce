package com.example.betwixbackend.auth;

import com.example.betwixbackend.dto.AuthRequest;
import com.example.betwixbackend.dto.AuthResponse;
import com.example.betwixbackend.dto.RegisterRequest;
import com.example.betwixbackend.enums.Genre;
import org.springframework.http.ResponseEntity;



public interface AuthService {


     void register(RegisterRequest registerRequest) ;
     String encryptedPassword(String password);
    public Genre mapStringToEnum(String genre);


     boolean existsByEmail(String email) ;




     ResponseEntity<AuthResponse> authenticate(AuthRequest request) ;


}
