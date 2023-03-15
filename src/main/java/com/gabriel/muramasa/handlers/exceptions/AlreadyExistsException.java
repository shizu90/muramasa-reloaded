/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.handlers.exceptions;

/**
 *
 * @author gabriell9090
 */
public class AlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public AlreadyExistsException(String msg) {
        super(msg);
    }
}
