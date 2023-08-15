/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.AlreadyExistsException;
import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.CharacterRepository;
import com.gabriel.muramasa.models.Character;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Log;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author giraf
 */

@Service
public class CharacterService {
    @Autowired
    private CharacterRepository repo;
    @Autowired
    private LogService logService;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    public CharacterService() {}
   
    public Character findByCodeAndAccount(Long code, Account favorited) {
        return repo.findByCodeAndFavorited(code, favorited).orElseThrow(() -> new NotFoundException("Character not found."));
    }
    
    public void favoriteCharacter(Character character, Account acc) {
        character.setFavorited(acc);
        Optional<Character> chr = repo.findByCodeAndFavorited(character.getCode(), acc);
        if(chr.isPresent()) {
            throw new AlreadyExistsException("Character already favorited.");
        }
        Log log = new Log(formatter.format(new Date()), acc.getUsername() + " favorited " + character.getName() + ".", acc);
        try {
            repo.save(character);
            logService.addRecentUpdate(log, acc.getRecentUpdates());
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }catch(ParseException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void unfavoriteCharacter(Long code, Account acc) {
        Character character = repo.findByCodeAndFavorited(code, acc).orElseThrow(() -> new NotFoundException("Character not favorited yet."));
        repo.delete(character);
    }
}
