/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.services.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    
    @GetMapping(value = "/{code}/{listId}")
    public ResponseEntity<Media> getMedia(@PathVariable Long code, @PathVariable Long listId) {
        return ResponseEntity.ok().body(service.findByCodeAndList(code, listId));
    }
    
    @PostMapping
    public ResponseEntity<Media> postMedia(@RequestBody Media media, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.insert(acc.getId(), media));
    }
    
    @PutMapping(value = "/{code}")
    public ResponseEntity<Media> putMedia(@RequestBody Media media, @PathVariable Long code, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        MediaList list = media.getType().equals("anime") ? acc.getAnimeList() : acc.getMangaList();
        Media md = service.findByCodeAndList(code, list.getId());
        return ResponseEntity.ok().body(service.update(md.getId(), media));
    }
    
    @DeleteMapping(value = "/{code}")
    public ResponseEntity<String> deleteMedia(@PathVariable Long code, @PathVariable Long listId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        Media md;
        try {
            md = service.findByCodeAndList(code, acc.getAnimeList().getId());
        } catch(NotFoundException e) {
            md = service.findByCodeAndList(code, acc.getMangaList().getId());
        }
        service.delete(md.getId());
        return ResponseEntity.ok().body("Media deleted.");
    }
    
}
