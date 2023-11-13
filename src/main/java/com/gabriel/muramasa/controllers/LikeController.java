package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.LikeService;
import com.gabriel.muramasa.models.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/likes")
public class LikeController {
    @Autowired
    private LikeService service;
    
    @PostMapping(value = "/like/{postId}")
    public ResponseEntity<Like> likePost(@PathVariable Long postId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.likePost(acc.getId(), postId));
    }
    
    @DeleteMapping(value = "/unlike/{postId}")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.unlikePost(acc.getId(), postId);
        return ResponseEntity.ok().body("Disliked the post.");
    }
}
