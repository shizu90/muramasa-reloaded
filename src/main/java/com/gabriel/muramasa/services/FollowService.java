/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.repositories.FollowerRepository;
import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Account;
import java.util.List;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author gabriell9090
 */

@Service
public class FollowService {
    
    @Autowired
    private FollowerRepository repo;
    @Autowired
    private AccountRepository accRepo;
    
    public List<Follower> getFollowing(Long userId) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        return acc.getFollowing();
    }
    
    public List<Follower> getFollowers(Long userId) {
        
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        return acc.getFollowers();
    }
    
    public Follower follow(Long fromId, Long toId) {
        Account from = accRepo.findById(fromId).orElseThrow(() -> new NotFoundException("From account not found."));
        Account to = accRepo.findById(toId).orElseThrow(() -> new NotFoundException("To account not found."));

        Follower follower = new Follower(from, to);

        try {
            return repo.save(follower);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public Follower unfollow(Long fromId, Long toId) {
        Account from = accRepo.findById(fromId).orElseThrow(() -> new NotFoundException("From account not found."));
        Account to = accRepo.findById(toId).orElseThrow(() -> new NotFoundException("To account not found."));

        Follower follower = repo.findBySearchParameter("" + from.hashCode() + to.hashCode()).orElseThrow(() -> new RuntimeException("Some error."));

        try {
            repo.delete(follower);
            return follower;
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
}
