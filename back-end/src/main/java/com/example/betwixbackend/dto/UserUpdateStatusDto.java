package com.example.betwixbackend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateStatusDto {
    private String id;

    @NotNull(message = "status must not be null")
    private Boolean status;
}
