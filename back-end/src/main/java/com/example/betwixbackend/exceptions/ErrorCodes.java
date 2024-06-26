package com.example.betwixbackend.exceptions;

public enum ErrorCodes {
    USER_BAD_CREDENTIALS(1000),
    AUTH_REQUEST_NOT_VALID(2000);
    private int code;

    ErrorCodes(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}