package com.example.betwixbackend.dto;

import com.example.betwixbackend.enums.Genre;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class UserRequest {
    private String id;

    @NotNull(message = "Firstname must not be null")
    private String firstName;

    @NotNull(message = "Lastname must not be null")
    private String lastName;

    @NotNull
    @Positive
    @Min(value = 18, message = "user must be at least 18 YO")
    private String birthday;

    private String Tel;

    private Genre genre;

    @NotNull(message = "email must not be null")
    @NotEmpty(message = "must not be null")
    @Email(message = "Email is not well formatter")
    private String email;
}
