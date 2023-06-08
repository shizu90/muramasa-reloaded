/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.services.LikeService;
import com.gabriel.muramasa.models.Like;
import com.gabriel.muramasa.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author giraf
 */

@RestController
@RequestMapping(value = "/likes")
public class LikeController {
    @Autowired
    private LikeService service;
    @Autowired
    private TokenService tokenService;
    
    @PostMapping(value = "/like/{userId}/{postId}")
    public ResponseEntity<Like> likePost(@PathVariable Long userId, @PathVariable Long postId, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        return ResponseEntity.ok().body(service.likePost(userId, postId));
    }
    
    @DeleteMapping(value = "/unline/{userId}/{postId}")
    public ResponseEntity<String> unlikePost(@PathVariable Long userId, @PathVariable Long postId, @RequestHeader(value = "Authorization") String bearer) {
        String username = tokenService.getSubject(bearer.replace("Bearer ", ""));
        service.setCurrentUser(username);
        service.unlikePost(userId, postId);
        return ResponseEntity.ok().body("Disliked the post.");
    }
}
