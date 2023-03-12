/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.dto.AccountConfigurationDTO;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.dto.AccountRegistrationDTO;
import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.repositories.MediaListRepository;
import java.util.ArrayList;
import java.util.Optional;
import org.hibernate.exception.ConstraintViolationException;
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
    public AccountService() {}
    
    public List<Account> findAll() {
        return repo.findAll();
    }
    
    public Account findById(Long id) {
        Optional<Account> account = repo.findById(id);
        return account.orElseThrow(() -> new RuntimeException("Account not found."));
    }
    
    public Account findByUsername(String username) {
        List<Account> response = repo.findByUsername(username);
        if(response != null) {
            return response.get(0);
        }else throw new RuntimeException("Account not found.");
    }
    
    public Account insert(AccountRegistrationDTO credentials) {
        if(!credentials.isEmailValid()) {throw new RuntimeException("Invalid e-mail.");}
        if(!credentials.isUsernameValid()) {throw new RuntimeException("Invalid username.");}
        if(!credentials.isPasswordValid()) {throw new RuntimeException("Invalid password.");}
        if(!credentials.isPasswordsMatches()) {throw new RuntimeException("Password don't match.");}
        if(!repo.findByEmail(credentials.getEmail()).isEmpty()) {throw new RuntimeException("E-mail already exists.");}
        if(!repo.findByUsername(credentials.getUsername()).isEmpty()) {throw new RuntimeException("Username already taken.");}
        try {
            Account acc = new Account(
                    null, credentials.getUsername(), credentials.getEmail(), credentials.getPassword(), 
                    "", "", "", null, null, new ArrayList<Follower>(), new ArrayList<Follower>()
            );
            acc = repo.save(acc);
            MediaList animeList = new MediaList(null, new ArrayList<Media>(), acc, "anime");
            MediaList mangaList = new MediaList(null, new ArrayList<Media>(), acc, "manga");
            acc.setAnimeList(mediaListRepo.save(animeList));
            acc.setMangaList(mediaListRepo.save(mangaList));
            return repo.save(acc);
            
        }catch(ConstraintViolationException e) {
            throw new RuntimeException("Some error occured.");
        }
    }
    
    public void update(AccountConfigurationDTO config, Long id) {
        Account acc = this.findById(id);
        if(config.getPassword().length() >= 6) {
            acc.setPassword(config.getPassword());
        }
        if() {
            
        }
    }
}
