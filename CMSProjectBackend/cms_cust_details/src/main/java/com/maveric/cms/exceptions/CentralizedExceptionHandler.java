package com.maveric.cms.exceptions;

import feign.FeignException;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
public class CentralizedExceptionHandler {
    private static final Logger Log = LoggerFactory.getLogger(CentralizedExceptionHandler.class);

    @ExceptionHandler(FeignException.BadRequest.class)
    public ResponseEntity<?> handleFeignStatusException(FeignException e) {
        String message = e.getMessage();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessage(message));
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public String handleConstraintViolation(Exception e){
        Log.info("handling exception in handleConstraintViolation");
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({CustomerIsPresentException.class, CustomerNotFound.class, EmptyDatabase.class})
    public String invalidCaseDetails(Exception e){
        Log.info("handling the exception", e);
        return e.getMessage();
    }
}
