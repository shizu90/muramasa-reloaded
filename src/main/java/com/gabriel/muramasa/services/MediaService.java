/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.MediaRepository;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.repositories.MediaListRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author gabriell9090
 */
@Service
public class MediaService {
    @Autowired
    private MediaRepository repo;
    @Autowired
    private MediaListRepository mediaListRepo;
    
    public MediaService() {}
    
    public Media findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Media not found."));
    }
    
    public Media insert(Long listId, Media media) {
        MediaList list = mediaListRepo.findById(listId).orElseThrow(() -> new NotFoundException("List not found."));
        try {
            media.setList(list);
            return repo.save(media);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public Media update(Long mediaId, Media media) {
        Media md = this.findById(mediaId);
        
        if(!media.getCount().equals(md.getCount())) {
            md.setCount(media.getCount());
        }
        if(!media.getStatus().equals(md.getStatus())) {
            md.setStatus(md.getCount().equals(md.getCountLength()) ? 2 : media.getStatus());
        }
        if(!media.getFavorited().equals(md.getFavorited())) {
            md.setFavorited(media.getFavorited());
        }
        
        try {
            return repo.save(md);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void delete(Long mediaId) {
        try {
            repo.deleteById(mediaId);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
}
