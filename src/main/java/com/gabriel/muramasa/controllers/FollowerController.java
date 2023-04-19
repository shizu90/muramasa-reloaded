/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.services.FollowService;
import com.gabriel.muramasa.models.Follower;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author gabriell9090
 */

@Controller
@RequestMapping(value = "/follower")
public class FollowerController {
    @Autowired
    private FollowService service;
    
    @PostMapping(value = "/follow/{fromId}/{toId}")
    public ResponseEntity<String> follow(@PathVariable Long fromId, @PathVariable Long toId) {
        Follower follower = service.follow(fromId, toId);
        
        return ResponseEntity.ok().body("You followed " + follower.getTo().getUsername() + ".");
    }
    
    @DeleteMapping(value = "/unfollow/{fromId}/{toId}")
    public ResponseEntity<String> unfollow(@PathVariable Long fromId, @PathVariable Long toId) {
        Follower follower = service.unfollow(fromId, toId);
        
        return ResponseEntity.ok().body("Your unfollowed " + follower.getTo().getUsername());
    }
}
