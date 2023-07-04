/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.repositories.LikeRepository;
import com.gabriel.muramasa.models.Like;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.repositories.PostRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author giraf
 */

@Service
public class LikeService {
    @Autowired
    private LikeRepository repo;
    @Autowired
    private AccountService accService;
    @Autowired
    private LogService logService;
    @Autowired
    private PostRepository postRepo;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    public LikeService() {}
    
    public Like likePost(Long userId, Long postId) {
        Account acc = accService.findById(userId);
        Post post = postRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        boolean alreadyExistsLike = repo.findByLikedByAndPost(acc, post).isEmpty();
        if(alreadyExistsLike) {
            Like like = new Like(null, acc, post);
            try {
                Like savedLike = repo.save(like);
                Log log = new Log(formatter.format(new Date()), "" + acc.getUsername() + "liked " + post.getCreator().getUsername() + "'s post.", acc);
                logService.addRecentUpdate(log, acc.getRecentUpdates());
                return savedLike;
            } catch(ConstraintViolationException e) {
                throw new DatabaseException(e.getMessage());
            } catch(ParseException e) {
                throw new DatabaseException(e.getMessage());
            }
        }else {
            this.unlikePost(userId, postId);
            return null;
        }
    }
    
    public void unlikePost(Long userId, Long postId) {
        Account acc = accService.findById(userId);
        Post post = postRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        Like like = repo.findByLikedByAndPost(acc, post).orElseThrow(() -> new NotFoundException("Like not found."));
        repo.delete(like);
    }
}
