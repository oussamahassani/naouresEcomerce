package com.example.betwixbackend.auth;

import com.example.betwixbackend.dto.AuthRequest;
import com.example.betwixbackend.dto.AuthResponse;
import com.example.betwixbackend.dto.ContactMsg;
import com.example.betwixbackend.dto.RegisterRequest;
import com.example.betwixbackend.service.MailSendService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController

@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;


	@Autowired
	MailSendService mailSendService;
	
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            service.register(request);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("status", false, "error", "Email already exist"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody AuthRequest request
    ) {
        try {
            // Call the authenticate method from your service
        	ResponseEntity<AuthResponse> authresponse =   service.authenticate(request);
            // If authentication succeeds, return 202 ACCEPTED status
            return authresponse;
        } catch (AuthenticationException e) {
            // If authentication fails, return 400 BAD_REQUEST status with an error message
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", false);
            errorResponse.put("error", "repeat");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((AuthResponse) errorResponse);
        }
    }
    
	@PostMapping(value="/sendContactForm")
	public ResponseEntity<?> sendContactForm(@RequestBody ContactMsg contactmsg) {
		
		
		var resultemail =  mailSendService.sendMsg(contactmsg.getEmail() ,contactmsg.getMessage() ,contactmsg.getName() )	;
		  return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("status", true,"msg",resultemail));
}
}
