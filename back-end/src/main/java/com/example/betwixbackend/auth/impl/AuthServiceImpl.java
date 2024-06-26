package com.example.betwixbackend.auth.impl;

import com.example.betwixbackend.auth.AuthService;
import com.example.betwixbackend.config.JwtService;
import com.example.betwixbackend.dto.AuthRequest;
import com.example.betwixbackend.dto.AuthResponse;
import com.example.betwixbackend.dto.RegisterRequest;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.enums.Genre;
import com.example.betwixbackend.enums.RoleEnum;
import com.example.betwixbackend.exceptions.ErrorCodes;
import com.example.betwixbackend.exceptions.InvalidCredentialsException;
import com.example.betwixbackend.exceptions.InvalidEntityException;
import com.example.betwixbackend.repository.UserRepository;
import com.example.betwixbackend.validation.AuthRequestValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager ;
    private final JwtService jwtService;

    public void register(RegisterRequest registerRequest) {

        if(Boolean.FALSE.equals(userRepository.existsByRoleAndEmail(RoleEnum.ROLE_CLIENT , registerRequest.getEmail())))
        {
            User user = new User();
            var encryptedPassword = passwordEncoder.encode(registerRequest.getPassword());
            user.setPassword(encryptedPassword);
            user.setFirstName(registerRequest.getFirstName());
            user.setEmail(registerRequest.getEmail());
            user.setGenre(registerRequest.getGenre());
            user.setBrithday(registerRequest.getBirthday());
            user.setTel(registerRequest.getTel());
            user.setLastName(registerRequest.getLastName());
            user.setEnabled(true);
            user.setRole(RoleEnum.ROLE_CLIENT);

            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Client deja existe  ");
        }


    }

    public Genre mapStringToEnum(String genre) {
        for (Genre value : Genre.values()) {
            if (value.name().equals(genre)) {
                return value;
            }
        }

        throw new IllegalArgumentException("No enum constant found with name: " + genre);
    }


    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }





    public ResponseEntity<AuthResponse> authenticate(AuthRequest request) {
        List<String> errors = AuthRequestValidation.validate(request);
        if(!errors.isEmpty())
        {
            throw new InvalidEntityException("Objet n'est pas valide" , ErrorCodes.AUTH_REQUEST_NOT_VALID,errors);
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch(Exception e)
        {
            System.out.println("bad credentials in ");
           throw new InvalidCredentialsException("Login / et ou mot de passe incorrect" , ErrorCodes.USER_BAD_CREDENTIALS);
        }


        final User user = userRepository.findByEmail(request.getEmail()).get();
        final String jwt = jwtService.generateToken( user);
        return ResponseEntity.ok(
                AuthResponse.builder()
                        .token(jwt)
                        .role(user.getRole().name())
                        .userId(user.getId())
                        .nameUser(user.getFirstName())
                        .build()
        ) ;

    }
    
    public String encryptedPassword(String password) {
    	return  passwordEncoder.encode(password);
    }
    		 
}
