/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.services.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Media> getMedia(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }
    
    @PostMapping(value = "/list/{listId}")
    public ResponseEntity<Media> postMedia(@RequestBody Media media, @PathVariable Long listId) {
        return ResponseEntity.ok().body(service.insert(listId, media));
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<Media> putMedia(@RequestBody Media media, @PathVariable Long mediaId) {
        return ResponseEntity.ok().body(service.update(mediaId, media));
    }
    
}
