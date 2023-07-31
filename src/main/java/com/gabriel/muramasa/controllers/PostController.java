/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.PostService;
import com.gabriel.muramasa.models.Post;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @author giraf
 */
@RestController
@RequestMapping(value = "/posts")
public class PostController {
    @Autowired
    private PostService service;
    
    @GetMapping(value = "/full/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok().body(service.getPostById(postId));
    }
    
    @GetMapping(value = "/following/{userId}")
    public ResponseEntity<List<Post>> getFollowingPosts(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getFollowingPosts(userId));
    }
    
    @GetMapping(value = "/{userId}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getUserPosts(userId));
    }
    
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.insert(acc.getId(), post));
    }
    
    @PostMapping("/{parentId}")
    public ResponseEntity<Post> replyPost(@RequestBody Post post, @PathVariable Long parentId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.insert(acc.getId(), post, parentId));
    }
    
    @PutMapping(value = "/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post post, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        Post p = service.getPostById(postId);
        if(acc.getId().equals(p.getCreator().getId())) {
            return ResponseEntity.ok().body(service.update(postId, post));
        }else throw new UnauthorizedException("Unauthorized post update.");
    }
    
    @DeleteMapping(value = "/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        service.delete(acc.getId(), postId);
        return ResponseEntity.ok().body("Successfully deleted post.");
    }
}
