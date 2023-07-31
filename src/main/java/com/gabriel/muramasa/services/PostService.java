/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.InvalidFormatException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Like;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.hibernate.exception.ConstraintViolationException;

/**
 *
 * @author giraf
 */

@Service
public class PostService {
    @Autowired
    private PostRepository repo;
    @Autowired
    private AccountService accService;
    @Autowired
    private LogService logService;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    public PostService() {}
    
    public Post getPostById(Long postId) {
        Post post = repo.findById(postId).orElseThrow(() -> new NotFoundException("Post with specified id not found."));
        return post;
    }
    
    public List<Post> getFollowingPosts(Long userId) {
        Account acc = accService.findById(userId);
        List<Post> followingPosts = new ArrayList<Post>();
        for(Follower following : acc.getFollowing()) {
            Account user = following.getTo();
            followingPosts.addAll(user.getPosts());
        }
        Collections.sort(followingPosts);
        
        return followingPosts;
    }
    
    public List<Post> getUserPosts(Long userId) {
        Account acc = accService.findById(userId);
        List<Post> posts = acc.getPosts();
        Collections.sort(posts);
        return posts;
    }
    
    public Post insert(Long userId, Post post) {
        Account acc = accService.findById(userId);
        String[] words = post.getText().split(" ");
        String[] attach = post.getAttach().split(";");
        if(words.length > 500) {throw new InvalidFormatException("Post text surpass limit of 500 words.");}
        if(attach.length > 4) {throw new InvalidFormatException("Post attached files surpass limit of 4 files.");}
        post.setCreator(acc);
        post.setLikes(new ArrayList<Like>());
        post.setDate(formatter.format(new Date()));
        post.setParent(null);
        try {
            Post savedPost = repo.save(post);
            Log log = new Log(formatter.format(new Date()), "" + acc.getUsername() + " created a post.", acc);
            logService.addRecentUpdate(log, acc.getRecentUpdates());
            return savedPost;
        } catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        } catch(ParseException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public Post insert(Long userId, Post post, Long parentId) {
        Account acc = accService.findById(userId);
        String[] words = post.getText().split(" ");
        String[] attach = post.getAttach().split(";");
        if(words.length > 500) {throw new InvalidFormatException("Post text surpass limit of 500 words.");}
        if(attach.length > 4) {throw new InvalidFormatException("Post attached files surpass limit of 4 files.");}
        post.setCreator(acc);
        post.setLikes(new ArrayList<Like>());
        post.setDate(formatter.format(new Date()));
        post.setParent(repo.findById(parentId).orElseThrow(() -> new NotFoundException("Parent post not found.")));
        try {
            Post savedPost = repo.save(post);
            Log log = new Log(formatter.format(new Date()), "" + acc.getUsername() + " replied a post.", acc);
            logService.addRecentUpdate(log, acc.getRecentUpdates());
            return savedPost;
        } catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        } catch(ParseException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public Post update(Long postId, Post newPost) {
        Post oldPost = repo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        
        if(!newPost.getText().equals(oldPost.getText())) {
            oldPost.setText(newPost.getText());
        }
        if(!newPost.getAttach().equals(oldPost.getAttach())) {
            oldPost.setAttach(newPost.getAttach());
        }

        return repo.save(oldPost);
    }
    
    public void delete(Long userId, Long postId) {
        Post post = repo.findById(postId).orElseThrow(() -> new NotFoundException("Post not found."));
        repo.deleteById(postId);
    }
}
