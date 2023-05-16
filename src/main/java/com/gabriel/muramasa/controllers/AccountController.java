/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.dto.AccountConfigurationDTO;
import com.gabriel.muramasa.dto.AccountRegistrationDTO;
import com.gabriel.muramasa.dto.UserDTO;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author gabriell9090
 */
@RestController
@RequestMapping(value = "/users")
public class AccountController {
    @Autowired
    private AccountService service;
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getAccount(@PathVariable Long id) {
        Account acc = service.findById(id);
        return ResponseEntity.ok().body(
            new UserDTO(acc.getUsername(), acc.getResume(), acc.getImgUrl(), acc.getBannerImgUrl(), 
                acc.getAnimeList(), acc.getMangaList(), acc.getFollowers(), acc.getFollowing(), acc.getRecentUpdates()));
    }
    @PostMapping
    public ResponseEntity<Account> postAccount(@RequestBody AccountRegistrationDTO credentials) {
        Account acc = service.insert(credentials);
        return ResponseEntity.ok().body(acc);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<String> putAccount(@PathVariable Long id, @RequestBody AccountConfigurationDTO config) {
        service.update(config, id);
        return ResponseEntity.ok().body("Information updated.");
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().body("Account deleted.");
    }
    
}
