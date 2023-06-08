/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.services.MediaService;
import com.gabriel.muramasa.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author gabriell9090
 */
@Controller
@RequestMapping(value = "/media")
public class MediaController {
    @Autowired
    private MediaService service;
    @Autowired
    private TokenService tokenService;
    
    @GetMapping(value = "/{code}/{listId}")
    public ResponseEntity<Media> getMedia(@PathVariable Long code, @PathVariable Long listId) {
        return ResponseEntity.ok().body(service.findByCodeAndList(code, listId));
    }
    
    @PostMapping(value = "/{userId}")
    public ResponseEntity<Media> postMedia(@RequestBody Media media, @PathVariable Long userId, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        return ResponseEntity.ok().body(service.insert(userId, media));
    }
    
    @PutMapping(value = "/{mediaId}")
    public ResponseEntity<Media> putMedia(@RequestBody Media media, @PathVariable Long mediaId, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        return ResponseEntity.ok().body(service.update(mediaId, media));
    }
    
    @DeleteMapping(value = "/{mediaId}")
    public ResponseEntity<String> deleteMedia(@PathVariable Long mediaId, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        service.delete(mediaId);
        return ResponseEntity.ok().body("Media deleted.");
    }
    
}
