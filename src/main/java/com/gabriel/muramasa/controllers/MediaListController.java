/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.services.MediaListService;
import com.gabriel.muramasa.models.Media;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author gabriell9090
 */
@RestController
@RequestMapping(value = "/list")
public class MediaListController {
    @Autowired
    private MediaListService service;
    
    @GetMapping(value = "/{userId}/{type}")
    public ResponseEntity<MediaList> getListByType(@PathVariable Long userId, @PathVariable String type) {
        return ResponseEntity.ok().body(service.getListByType(userId, type));
    }
    
    @GetMapping(value = "/items/{id}/{status}")
    public ResponseEntity<List<Media>> getMediasByStatus(@PathVariable Integer status, @PathVariable Long id) {
        return ResponseEntity.ok().body(service.getMediasByStatus(id, status));
    }
}
