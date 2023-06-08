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
import com.gabriel.muramasa.models.Reply;
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
        String[] words = post.getText().split(" ");
        String[] imgs = post.getAttachedImgs().split(";");
        Account acc = accService.findById(userId);
        if(words.length > 500) {throw new InvalidFormatException("Post text surpass limit of 500 words.");}
        if(imgs.length > 4) {throw new InvalidFormatException("Post attached images surpass limit of 4 images.");}
        post.setCreator(acc);
        post.setLikes(new ArrayList<Like>());
        post.setReplies(new ArrayList<Reply>());
        post.setDate(formatter.format(new Date()));
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
    
    public Post update(Post newPost) {
        Post oldPost = repo.findById(newPost.getId()).orElseThrow(() -> new NotFoundException("Post not found."));
        
        if(!newPost.getText().equals(oldPost.getText())) {
            oldPost.setText(newPost.getText());
        }
        if(!newPost.getAttachedImgs().equals(oldPost.getAttachedImgs())) {
            oldPost.setAttachedImgs(newPost.getAttachedImgs());
        }
        
        return repo.save(oldPost);
    }
    
    public void delete(Long postId) {
        repo.deleteById(postId);
    }
}
