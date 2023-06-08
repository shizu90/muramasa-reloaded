/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.InvalidFormatException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.handlers.exceptions.UnauthorizedException;
import com.gabriel.muramasa.repositories.ReplyRepository;
import com.gabriel.muramasa.models.Reply;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Account;
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
public class ReplyService {
    @Autowired
    private ReplyRepository repo;
    @Autowired
    private AccountService accService;
    @Autowired
    private LogService logService;
    @Autowired
    private PostRepository postRepo;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    private String currentUser;
    
    public ReplyService() {}
    
    public void setCurrentUser(String currentUser) {
        this.currentUser = currentUser;
    }
    
    public Reply replyPost(Long postId, Long userId, Reply reply) {
        String[] words = reply.getText().split(" ");
        String[] imgs = reply.getAttachedImgs().split(";");
        
        if(words.length > 500) {throw new InvalidFormatException("Reply surpass limit of 500 words.");}
        if(imgs.length > 2) {throw new InvalidFormatException("Reply surpass limit of 2 attached images.");}
        
        Post post = postRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        Account acc = accService.findById(userId);
        if(acc.getUsername().equals(this.currentUser)) {
            reply.setCreator(acc);
            reply.setPost(post);
            try {
                Reply savedReply = repo.save(reply);
                Log log = new Log(formatter.format(new Date()), "" + acc.getUsername() + " replied to " + post.getCreator().getUsername() + "'s post.", acc);
                logService.addRecentUpdate(log, acc.getRecentUpdates());
                return savedReply;
            } catch(ConstraintViolationException e) {
                throw new DatabaseException(e.getMessage());
            } catch(ParseException e) {
                throw new DatabaseException(e.getMessage());
            }
        }else throw new UnauthorizedException("Unauthorized operation.");
    }
    
    public void delete(Long userId, Long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        Account acc = accService.findById(userId);
        if(acc.getUsername().equals(this.currentUser)) {
            Reply reply = repo.findByCreatorAndPost(acc, post).orElseThrow(() -> new NotFoundException("Reply not found."));
            repo.delete(reply);
        }else throw new UnauthorizedException("Unauthorized operation.");
    }
}
