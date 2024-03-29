package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.services.MediaListService;
import com.gabriel.muramasa.models.Media;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/list")
public class MediaListController {
    @Autowired
    private MediaListService service;
    
    @GetMapping(value = "/{userId}/{type}")
    public ResponseEntity<MediaList> getListByType(@PathVariable Long userId, @PathVariable String type) {
        return ResponseEntity.ok().body(service.getListByType(userId, type));
    }
    
    @GetMapping(value = "/items/{listId}/{status}/{offset}")
    public ResponseEntity<Page<Media>> getMediasByStatus(@PathVariable Integer status, @PathVariable Long listId, @PathVariable Integer offset) {
        return ResponseEntity.ok().body(service.getMediasByStatus(listId, status, offset));
    }
    
    @GetMapping(value = "/items/{listId}/{status}/{offset}/{size}")
    public ResponseEntity<Page<Media>> getMediasByStatus(@PathVariable Integer status, @PathVariable Long listId, @PathVariable Integer offset, @PathVariable Integer size) {
        return ResponseEntity.ok().body(service.getMediasByStatus(listId, status, offset, size));
    }
}
