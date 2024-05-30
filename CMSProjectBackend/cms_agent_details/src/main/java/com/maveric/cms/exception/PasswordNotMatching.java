package com.maveric.cms.exception;

public class PasswordNotMatching extends RuntimeException{

    public PasswordNotMatching(String message) {
        super(message);
    }
}
