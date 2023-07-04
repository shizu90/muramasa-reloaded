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
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    
    @GetMapping(value = "/info")
    public ResponseEntity<AccountConfigurationDTO> getAccountInfo(Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(new AccountConfigurationDTO(acc));
    }
    
    @PutMapping
    public ResponseEntity<String> putAccount(@RequestBody AccountConfigurationDTO config, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.update(config, acc.getId());
        return ResponseEntity.ok().body("Information updated.");
    }
    
    @DeleteMapping
    public ResponseEntity<String> deleteAccount(Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.delete(acc.getId());
        return ResponseEntity.ok().body("Account deleted.");
    }
    
}
