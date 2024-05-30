package com.maveric.cms_audit_event.exception;

import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
public class CentralizedExceptionHandler {
    private static final Logger Log = LoggerFactory.getLogger(CentralizedExceptionHandler.class);
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public String handleConstraintViolation(Exception e){
        Log.info("handling exception in handleConstraintViolation");
        return e.getMessage();
    }

}
