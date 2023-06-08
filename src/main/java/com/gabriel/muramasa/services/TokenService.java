/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.gabriel.muramasa.models.Account;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.springframework.stereotype.Service;

/**
 *
 * @author manou
 */

@Service
public class TokenService {
    public TokenService() {}
    
    public String generateToken(Account account) {
        return JWT.create()
                .withIssuer("Muramasa")
                .withSubject(account.getUsername())
                .withClaim("id", account.getId())
                .withExpiresAt(LocalDateTime.now()
                        .plusMinutes(5)
                        .toInstant(ZoneOffset.of("-03:00")))
                .sign(Algorithm.HMAC256("SECRETO"));
    }
    
    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256("SECRETO"))
                .withIssuer("Muramasa")
                .build().verify(token).getSubject();
    }
}
