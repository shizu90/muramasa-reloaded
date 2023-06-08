/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.services.ReplyService;
import com.gabriel.muramasa.models.Reply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author giraf
 */

@RestController
@RequestMapping(value = "/replies")
public class ReplyController {
    @Autowired
    private ReplyService service;
    
    @PostMapping(value = "/{userId}/{postId}")
    public ResponseEntity<Reply> replyPost(@PathVariable Long userId, @PathVariable Long postId, @RequestBody Reply reply) {
        return ResponseEntity.ok().body(service.replyPost(postId, userId, reply));
    }
    
    @DeleteMapping(value = "/{userId}/{postId}")
    public ResponseEntity<String> unreply(@PathVariable Long userId, @PathVariable Long postId) {
        service.delete(userId, postId);
        return ResponseEntity.ok().body("Deleted reply.");
    }
}
