package com.example.betwixbackend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String role ;
    private String userId ;
    private String nameUser ;
    private Boolean enabled ;

}
