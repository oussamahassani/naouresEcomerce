package com.example.betwixbackend.handlers;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ErrorResponse {
    private Set<String> validationErrors;
    private String errorMsg;
    private Integer errorCode;
}
