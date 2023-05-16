/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import java.util.Date;
import java.text.SimpleDateFormat;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.MediaRepository;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.repositories.MediaListRepository;
import java.text.ParseException;
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
    @Autowired
    private AccountRepository accRepo;
    @Autowired
    private LogService logService;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    
    public MediaService() {}
    
    public String parseStatus(Integer status, String type) {
        switch(status) {
            case 1:
                return type.equals("anime") ? "is watching" : "is reading";
            case 2:
                return "completed";
            case 3:
                return "dropped";
            case 4:
                return type.equals("anime") ? "plans to watch" : "plans to read";
            default:
                return null;
        }
    }
    
    public Media findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Media not found."));
    }
    
    public Media insert(Long userId, Media media) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        try {
            if(media.getType().equals("anime")) {
                media.setList(acc.getAnimeList());
            }else media.setList(acc.getMangaList());
            String message = acc.getUsername() + " added " + media.getName() + " to his " + media.getType() + " list.";
            Log update = new Log(formatter.format(new Date()), message, acc);

            logService.addRecentUpdate(update, acc.getRecentUpdates());
            return repo.save(media);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }catch(ParseException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public Media update(Long mediaId, Media media) {
        Media md = this.findById(mediaId);
        Account acc = md.getList().getAccount();
        Log log = new Log(formatter.format(new Date()), "", acc);
        String type = md.getType();
        
        if(!media.getCount().equals(md.getCount())) {
            md.setCount(media.getCount());
            if(type.equals("anime")) {
                log.setMessage(acc.getUsername() + " watched " + media.getCount() + "/" + md.getCountLength() + " episodes of " + md.getName() + ".");
            }else
                log.setMessage(acc.getUsername() + " read " + media.getCount() + "/" + md.getCountLength() + " chapters of " + md.getName() + ".");
        }
        if(!media.getStatus().equals(md.getStatus())) {
            md.setStatus(md.getCount().equals(md.getCountLength()) ? 2 : media.getStatus());
            String status = parseStatus(md.getStatus(), media.getType());
            log.setMessage(acc.getUsername() + " now " + status + " " + md.getName() + ".");
        }
        if(!media.getFavorited().equals(md.getFavorited())) {
            md.setFavorited(media.getFavorited());
            log.setMessage(acc.getUsername() + (md.getFavorited() > 0 ? " favorited " : "unfavorited ") + md.getName() + ".");
        }
        
        try {
            logService.addRecentUpdate(log, acc.getRecentUpdates());
            return repo.save(md);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }catch(ParseException e) {
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
