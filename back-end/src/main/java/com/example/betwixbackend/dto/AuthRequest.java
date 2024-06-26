package com.example.betwixbackend.dto;

import com.example.betwixbackend.enums.Genre;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequest {

    @NotNull(message = "email must not be null")

    @Email(message = "Email is not well formatter")
    private String email;

    @NotNull(message = "password must not be null")
    private String password;

}
