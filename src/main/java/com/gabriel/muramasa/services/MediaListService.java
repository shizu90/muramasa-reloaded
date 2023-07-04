package com.gabriel.muramasa.services;


import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.repositories.MediaListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.repositories.MediaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author gabriell9090
 */
@Service
public class MediaListService {
    @Autowired
    private MediaListRepository repo;
    @Autowired
    private MediaRepository mediaRepo;
    @Autowired
    private AccountRepository accRepo;
    
    public MediaListService() {}
    
    public MediaList getListByType(Long userId, String type) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        
        if(type.toLowerCase().equals("anime")) {
            return acc.getAnimeList();
        }
        if(type.toLowerCase().equals("manga")) {
            return acc.getMangaList();
        }
        return acc.getAnimeList();
    }
    
    public List<Media> getFavorites(Long userId, String type) {
        List<Media> favorites = new ArrayList<Media>();
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        MediaList list = type.equals("anime") ? acc.getAnimeList() : acc.getMangaList();
        list.getItems().forEach((Media media) -> {
            if(media.getFavorited() == 1) {
                favorites.add(media);
            }
        });
        return favorites;
    }
    
    public Page<Media> getMediasByStatus(Long listId, Integer status, Integer offset) {
        MediaList list = repo.findById(listId).orElseThrow(() -> new NotFoundException("List not found."));
        return mediaRepo.findByListAndStatus(list, status, PageRequest.of(offset, 16));
    }
    
    public Page<Media> getMediasByStatus(Long listId, Integer status, Integer offset, Integer size) {
        MediaList list = repo.findById(listId).orElseThrow(() -> new NotFoundException("List not found."));
        return mediaRepo.findByListAndStatus(list, status, PageRequest.of(offset, size));
    }
}
