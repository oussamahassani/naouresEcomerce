package com.example.betwixbackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    @NotNull(message = "Firstname must not be null")
    @NotBlank(message = "Firstname must not be null")
    private String firstName;

    @NotNull(message = "Lastname must not be null")
    @NotBlank(message = "Lastname must not be null")
    private String lastName;

    private String genre;

    private String tel;

   // @NotNull(message = "birthday must not be null")
    private String birthday;

    @NotNull(message = "Email must not be null")
    @Email(message = "Email is not well formatter")
    private String email;

    @NotNull(message = "Password must not be null")
    @NotEmpty(message = "Password must not be null")
    private String password;


}
