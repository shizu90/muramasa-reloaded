/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.handlers;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.gabriel.muramasa.handlers.exceptions.*;
import java.time.Instant;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author gabriell9090
 */
@ControllerAdvice
public class ControllerExceptionHandler {
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StandardException> notFound(NotFoundException e, HttpServletRequest request) {
        String error = "Not found error.";
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardException standard = new StandardException(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(standard);
    }
    
    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<StandardException> badRequest(DatabaseException e, HttpServletRequest request) {
        String error = "Database error.";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardException standard = new StandardException(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(standard);
    }
    
    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<StandardException> conflict(InvalidFormatException e, HttpServletRequest request) {
        String error = "Invalid format error.";
        HttpStatus status = HttpStatus.CONFLICT;
        StandardException standard = new StandardException(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(standard);
    }
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<StandardException> unauthorized(UnauthorizedException e, HttpServletRequest request) {
        String error = "Unauthorized error.";
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        StandardException standard = new StandardException(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(standard);
    }
    
    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<StandardException> forbidden(AlreadyExistsException e, HttpServletRequest request) {
        String error = "Already exists error.";
        HttpStatus status = HttpStatus.FORBIDDEN;
        StandardException standard = new StandardException(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(standard);
    }
}
