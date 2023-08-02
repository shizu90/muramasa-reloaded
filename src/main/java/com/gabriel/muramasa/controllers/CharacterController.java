/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.CharacterService;
import com.gabriel.muramasa.models.Character;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author giraf
 */
@RestController
@RequestMapping(value = "/character")
public class CharacterController {
    @Autowired
    private CharacterService service;
    
    @GetMapping(value = "/{code}")
    public ResponseEntity<Character> getCharacter(@PathVariable Long code, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.findByCodeAndAccount(code, acc));
    }
    
    @PostMapping(value = "/favorite")
    public ResponseEntity<String> favoriteCharacter(@RequestBody Character character, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.favoriteCharacter(character, acc);
        return ResponseEntity.ok().body("Successfully favorited character.");
    }
    
    @DeleteMapping(value = "/unfavorite/{code}")
    public ResponseEntity<String> unfavoriteCharacter(@PathVariable Long code, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.unfavoriteCharacter(code, acc);
        return ResponseEntity.ok().body("Successfully unfavorited character.");
    }
}
