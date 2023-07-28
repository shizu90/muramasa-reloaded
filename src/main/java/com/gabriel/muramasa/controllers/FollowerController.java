/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.FollowService;
import com.gabriel.muramasa.models.Follower;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    
    @GetMapping(value = "/following/{userId}")
    public ResponseEntity<List<Follower>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getFollowing(userId));
    }
    
    @GetMapping(value = "/followers/{userId}")
    public ResponseEntity<List<Follower>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getFollowers(userId));
    }
    
    @PostMapping(value = "/follow/{toId}")
    public ResponseEntity<String> follow(@PathVariable Long toId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        Follower follower = service.follow(acc.getId(), toId);
        return ResponseEntity.ok().body("You followed " + follower.getTo().getUsername() + ".");
    }
    
    @DeleteMapping(value = "/unfollow/{toId}")
    public ResponseEntity<String> unfollow(@PathVariable Long toId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        Follower follower = service.unfollow(acc.getId(), toId);
        return ResponseEntity.ok().body("You unfollowed " + follower.getTo().getUsername() + ".");
    }
}
