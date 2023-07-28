/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.ReviewRepository;
import java.text.SimpleDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gabriel.muramasa.models.Review;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.repositories.MediaRepository;
import java.util.Date;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;


/**
 *
 * @author giraf
 */

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repo;
    @Autowired
    private AccountRepository accRepo;
    @Autowired
    private MediaRepository mediaRepo;
    
    private SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    
    public ReviewService() {};
    
    
    public Page<Review> findByMediaCode(Long code, Integer offset) {
        return repo.findByCode(code, PageRequest.of(offset, 16));
    }
    
    public Page<Review> findByAccount(Long userId, Integer offset) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        return repo.findByReviewer(acc, PageRequest.of(offset, 16));
    }
    
    public Review findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Review not found."));
    }
    
    public Review insert(Review review, Long mediaId, Long userId) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        Media media = mediaRepo.findById(mediaId).orElseThrow(() -> new NotFoundException("Media not found."));
        
        review.setReviewedAt(formatter.format(new Date()));
        review.setReviewer(acc);
        review.setMedia(media);
        try {
            return repo.save(review);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void update(Review review, Long reviewId) {
        Review r = this.findById(reviewId);
        if(!review.getText().equals(r.getText())) {
            r.setText(review.getText());
        }
        if(!review.getScore().equals(r.getScore())) {
            r.setScore(review.getScore());
        }
        try {
            repo.save(r);
        }catch(ConstraintViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public void delete(Long id) {
        Review r = this.findById(id);
        repo.delete(r);
    }
}
