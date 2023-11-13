package com.gabriel.muramasa.configurations;

import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.services.TokenService;
import com.gabriel.muramasa.models.Account;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class FilterToken extends OncePerRequestFilter {
    
    @Autowired
    private TokenService service;
    @Autowired
    private AccountRepository repo;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
            HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        String token;
        var authorization = request.getHeader("Authorization");
        
        if(authorization != null) {
            token = authorization.replace("Bearer ", "");
            var subject = this.service.getSubject(token);
        
            Account user = this.repo.findByUsername(subject).orElseThrow(() -> new NotFoundException("Account not found."));
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
}
