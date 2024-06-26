package com.example.betwixbackend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String firstName;
    private String lastName;
    private String email;
    private String tel;
    private String genre;
    private String birthday;
    private String password;
    private String imgUrl;

    private boolean enabled;
}
