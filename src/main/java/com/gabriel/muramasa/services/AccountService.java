/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.dto.AccountConfigurationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.dto.AccountRegistrationDTO;
import com.gabriel.muramasa.handlers.exceptions.AlreadyExistsException;
import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.InvalidFormatException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Like;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Character;
import com.gabriel.muramasa.models.Review;
import com.gabriel.muramasa.repositories.MediaListRepository;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
/**
 *
 * @author gabriell9090
 */

@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;
    @Autowired
    private MediaListRepository mediaListRepo;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    public AccountService() {}
    
    public Page<Account> search(String username, Integer offset, Integer limit) {
        return repo.findByUsername(username, PageRequest.of(offset, limit));
    }
    
    public Account findById(Long id) {
        Optional<Account> account = repo.findById(id);
        return account.orElseThrow(() -> new NotFoundException("Account not found."));
    }
    
    public Account findByUsername(String username) {
        Account acc = repo.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found."));
        return acc;
    }
    
    public Account insert(AccountRegistrationDTO credentials) {
        try {    
            if(!credentials.isEmailValid()) {throw new InvalidFormatException("Invalid e-mail.");}
            if(!credentials.isUsernameValid()) {throw new InvalidFormatException("Invalid username.");}
            if(!credentials.isPasswordValid()) {throw new InvalidFormatException("Invalid password.");}
            if(!credentials.isPasswordsMatches()) {throw new InvalidFormatException("Password don't match.");}
            if(!repo.findByEmail(credentials.getEmail()).isEmpty()) {throw new AlreadyExistsException("E-mail already exists.");}
            if(!repo.findByUsername(credentials.getUsername()).isEmpty()) {throw new AlreadyExistsException("Username already taken.");}

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
            
            Account acc = new Account(
                    null, credentials.getUsername(), credentials.getEmail(), encoder.encode(credentials.getPassword()), 
                    "", "", "", formatter.format(new Date()), null, null, new ArrayList<Follower>(), new ArrayList<Follower>(), 
                    new ArrayList<Log>(), new ArrayList<Post>(), new ArrayList<Like>(), new ArrayList<Character>(), new ArrayList<Review>()
            );
            acc = repo.save(acc);
            MediaList animeList = new MediaList(null, new ArrayList<Media>(), acc, "anime");
            MediaList mangaList = new MediaList(null, new ArrayList<Media>(), acc, "manga");
            acc.setAnimeList(mediaListRepo.save(animeList));
            acc.setMangaList(mediaListRepo.save(mangaList));
            return repo.save(acc);
            
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void update(AccountConfigurationDTO config, Long id) {
        Account acc = this.findById(id);
        if(config.isPasswordValid()) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            acc.setPassword(encoder.encode(config.getPassword()));
        }
        if(config.isEmailValid() && repo.findByEmail(config.getEmail()).isEmpty()) {
            acc.setEmail(config.getEmail());
        }
        if(config.isUsernameValid() && repo.findByUsername(config.getUsername()).isEmpty()) {
            acc.setUsername(config.getUsername());
        }
        acc.setImgUrl(config.getImgUrl());
        acc.setBannerImgUrl(config.getBannerImgUrl());
        acc.setResume(config.getResume());
        repo.save(acc);
    }
    
    public void delete(Long id) {
        Account acc = this.findById(id);
        repo.deleteById(id);
    }
}
