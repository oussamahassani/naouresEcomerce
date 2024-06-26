package com.example.betwixbackend;

import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.enums.RoleEnum;
import com.example.betwixbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableMongoAuditing

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BetwixBackendApplication implements CommandLineRunner {
    private final UserRepository userRepository ;
     private final  PasswordEncoder passwordEncoder ;

    public static void main(String[] args) {
        SpringApplication.run(BetwixBackendApplication.class, args);
    }

    @Override
    public void run(String... args)  {
    /*    if(Boolean.FALSE.equals(userRepository.existsByRole(RoleEnum.ROLE_SUPERADMIN)))
        {

           User superAdmin = new User();
            superAdmin.setId("User-SP-"+ System.currentTimeMillis());
            superAdmin.setFirstName("Super");
            superAdmin.setLastName("Admin");
            superAdmin.setEmail("superadmin@betwix.com");
            superAdmin.setPassword(passwordEncoder.encode("BW12345678"));
            superAdmin.setRole(RoleEnum.ROLE_ADMIN);
            userRepository.save(superAdmin);

        }  */
    }
  
}
