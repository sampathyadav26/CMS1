package com.maveric.cms.exceptions;

public class CustomerIsPresentException extends RuntimeException{
    public CustomerIsPresentException(String message) {
        super(message);
    }
}
