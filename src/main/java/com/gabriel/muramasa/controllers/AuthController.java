package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.dto.AuthDTO;
import com.gabriel.muramasa.dto.LoginDTO;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public AuthDTO login(@RequestBody LoginDTO login) {
        UsernamePasswordAuthenticationToken usrPasswdToken = new UsernamePasswordAuthenticationToken(
                login.getUsername(), login.getPassword()
        );
        Authentication authenticate = this.authManager.authenticate(usrPasswdToken);
        var account = (Account) authenticate.getPrincipal();
        
        AuthDTO auth = new AuthDTO(
                account.getId(), 
                account.getUsername(), 
                account.getImgUrl(),
                account.getEmail(), 
                account.getAnimeList().getId(), 
                account.getMangaList().getId(), 
                tokenService.generateToken(account));
        
        return auth;
    }
}
