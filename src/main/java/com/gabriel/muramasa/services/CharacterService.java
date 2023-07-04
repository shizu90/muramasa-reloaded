/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.repositories.CharacterRepository;
import com.gabriel.muramasa.models.Character;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.repositories.AccountRepository;
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
    private AccountRepository accRepo;
    
    public CharacterService() {}
   
    public void favoriteCharacter(Character character, Long userId) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        character.setFavoritedBy(acc);
        try {
            repo.save(character);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void unfavoriteCharacter(Long code, Long userId) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        Character character = repo.findByCode(code).orElseThrow(() -> new NotFoundException("Character not favorited yet."));
        repo.delete(character);
    }
}
