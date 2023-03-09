/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author gabriell9090
 */
@RestController
@RequestMapping(value = "/")
public class UserController {
    @GetMapping(value = "/users")
    public ResponseEntity<String> getSample() {
        return ResponseEntity.ok().body("Hello World");
    }
}
