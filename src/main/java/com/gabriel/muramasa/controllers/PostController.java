/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.services.PostService;
import com.gabriel.muramasa.models.Post;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    
    @GetMapping(value = "/following/{userId}")
    public ResponseEntity<List<Post>> getFollowingPosts(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getFollowingPosts(userId));
    }
    
    @GetMapping(value = "/{userId}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok().body(service.getUserPosts(userId));
    }
    
    @PostMapping(value = "/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable Long userId, @RequestBody Post post) {
        return ResponseEntity.ok().body(service.insert(userId, post));
    }
    
    @PutMapping
    public ResponseEntity<Post> updatePost(@RequestBody Post post) {
        return ResponseEntity.ok().body(service.update(post));
    }
    
    @DeleteMapping(value = "/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        service.delete(postId);
        return ResponseEntity.ok().body("Successfully deleted post.");
    }
}
