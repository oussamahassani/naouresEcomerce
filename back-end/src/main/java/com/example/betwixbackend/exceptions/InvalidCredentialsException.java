package com.example.betwixbackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor

public class InvalidCredentialsException extends RuntimeException{
    private final ErrorCodes errorCode;
    public InvalidCredentialsException(String message, ErrorCodes errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}