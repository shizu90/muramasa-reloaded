/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.dto.AccountConfigurationDTO;
import com.gabriel.muramasa.dto.AccountRegistrationDTO;
import com.gabriel.muramasa.dto.UserDTO;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.AccountService;
import com.gabriel.muramasa.services.TokenService;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    @Autowired
    private TokenService tokenService;
    
    @GetMapping(value = "/info/{id}")
    public ResponseEntity<Account> getAccountInfo(@PathVariable Long id, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        Account acc = service.findById(id);
        if(!acc.getUsername().equals(username)) throw new UnauthorizedException("Unauthorized operation.");
        return ResponseEntity.ok().body(acc);
    }
    
    @GetMapping(value = "/user/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) {
        Account acc = service.findByUsername(username);
        return ResponseEntity.ok().body(
                new UserDTO(acc));
    }
    
    @GetMapping(value = "/{username}/{offset}")
    public ResponseEntity<Page<UserDTO>> getUsers(@PathVariable String username, @PathVariable Integer offset) {
        Page<Account> accountPage = service.search(username, offset);
        Page<UserDTO> userPage = accountPage.map(new Function<Account, UserDTO>() {
            @Override
            public UserDTO apply(Account acc) {
                return new UserDTO(acc);
            }
        });
        return ResponseEntity.ok().body(userPage);
    }
    @PostMapping
    public ResponseEntity<Account> postAccount(@RequestBody AccountRegistrationDTO credentials) {
        Account acc = service.insert(credentials);
        return ResponseEntity.ok().body(acc);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<String> putAccount(@PathVariable Long id, @RequestBody AccountConfigurationDTO config, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        service.update(config, id);
        return ResponseEntity.ok().body("Information updated.");
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        service.delete(id);
        return ResponseEntity.ok().body("Account deleted.");
    }
    
}
