package com.gabriel.muramasa.services;


import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.repositories.MediaListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Media;
import java.util.List;
import java.util.stream.Collectors;

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
    private AccountRepository accRepo;
    public MediaListService() {}
    
    public MediaList getListByType(Long accId, String type) {
        Account acc = accRepo.findById(accId).orElseThrow(() -> new RuntimeException("Account not found."));
        if(type.toLowerCase().equals("anime")) {
            return acc.getAnimeList();
        }
        if(type.toLowerCase().equals("manga")) {
            return acc.getMangaList();
        }
        return acc.getAnimeList();
    }
    
    public List<Media> getMediasByStatus(Long listId, Integer status) {
        MediaList list = repo.findById(listId).orElseThrow(() -> new RuntimeException("List not found."));
        return list.getItems().stream().filter(m -> m.getStatus().equals(status)).collect(Collectors.toList());
    }
}
