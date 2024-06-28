package com.example.betwixbackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.betwixbackend.dto.UserResponse;
import com.example.betwixbackend.dto.UserUpdateStatusDto;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.repository.UserRepository;
import com.example.betwixbackend.service.UserIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.example.betwixbackend.service.UserService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:54089" , "http://localhost:53200"})
public class UserController {


    @Autowired
    private UserIService userIService;

    @GetMapping
    //@PreAuthorize("hasAnyRole('SUPERADMIN' , 'ADMIN' , 'CLIENT')")
    public ResponseEntity<List<User>> findAllByRole(@RequestParam("role") String role) {
        List<User> list = new ArrayList<>();
        if(StringUtils.hasLength(role) && "admin".equals(role))
        {
            list = userIService.repository.findAllByRole("ROLE_ADMIN");

        }
        if(StringUtils.hasLength(role) && "client".equals(role))
        {
            list = userIService.repository.findAllByRole("ROLE_CLIENT");

        }
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")

    public ResponseEntity<Optional<User>> findById(@PathVariable String id) {
        Optional<User> obj = userIService.repository.findById(id);
        return ResponseEntity.ok().body(obj);
    }
    @GetMapping(value = "/getDashbord")

    public ResponseEntity<Map<String, Object>> getDashbord() {
    	Map<String, Object> obj = userIService.getDashbordData();
        return ResponseEntity.ok().body(obj);
    }
    @PostMapping(path = "/save", consumes = MediaType.ALL_VALUE)

    public ResponseEntity<User> createUser(@RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName, @RequestParam(required = false) String genre, @RequestParam(required = false) String tel, @RequestParam(required = false) String brithday, @RequestParam(required = false) String email, @RequestParam(required = false) String password, @RequestParam(required = false) String enabled, @RequestParam(required = false) String role, 
    		@RequestParam(required = false) MultipartFile imgUrl) {
        System.out.println(imgUrl.getOriginalFilename());
        boolean Enabled = true ; 
        if(!enabled.isEmpty() && enabled.equals("false"))
        {
        	Enabled = false ; 
        }
        User createdUser = userIService.createUser(firstName, lastName, genre, tel, brithday, email, password, Enabled, role, imgUrl);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
    @PostMapping(path = "/updatePassword/{id}")

    public ResponseEntity<User> updatePassword(@PathVariable String id ,@RequestBody UserResponse userData) {
      
        User updatedUser = userIService.updateUserPassword(id, userData);
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userIService.findAll();
        if (users.size() > 0) {
            return new ResponseEntity<List<User>>(users, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("No Users available", HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping(path = "/updateStatus", consumes = MediaType.ALL_VALUE)

    public ResponseEntity<User> updateStatus(@RequestBody UserUpdateStatusDto userUpdateStaus) {
        User updateUser = userIService.UpdateStatusUser(userUpdateStaus);
        return new ResponseEntity<>(updateUser, HttpStatus.CREATED);
    }

    @PatchMapping

    public ResponseEntity<User> UpdateUser(@RequestBody User user) {
        User updateUser = userIService.UpdateUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.CREATED);
    }


}
