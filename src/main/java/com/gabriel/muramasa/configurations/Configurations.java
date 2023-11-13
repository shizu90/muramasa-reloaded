package com.gabriel.muramasa.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class Configurations {
    
    @Autowired
    private FilterToken filter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().cors().and().authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/login")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/users/**")
                .permitAll()
                .requestMatchers(HttpMethod.POST, "/users")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/list/**")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/follower/**")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/posts/**")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/character/**")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/reviews/**")
                .permitAll()
                .anyRequest().authenticated()
                .and().addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
