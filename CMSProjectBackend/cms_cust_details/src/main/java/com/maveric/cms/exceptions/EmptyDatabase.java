package com.maveric.cms.exceptions;

public class EmptyDatabase extends RuntimeException{
    public EmptyDatabase(String message) {
        super(message);
    }
}
