package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.services.ReviewService;
import com.gabriel.muramasa.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewController {
    @Autowired
    private ReviewService service;
    
    @GetMapping(value = "/user/{userId}/{offset}")
    public ResponseEntity<Page<Review>> getUserReviews(@PathVariable Long userId, @PathVariable Integer offset) {
        return ResponseEntity.ok().body(service.findByAccount(userId, offset));
    }
    
    @GetMapping(value = "/media/{mediaCode}/{offset}")
    public ResponseEntity<Page<Review>> getMediaReviews(@PathVariable Long mediaCode, @PathVariable Integer offset) {
        return ResponseEntity.ok().body(service.findByMediaCode(mediaCode, offset));
    }
    
    @PostMapping(value = "/{mediaId}")
    public ResponseEntity<Review> postReview(@RequestBody Review review, @PathVariable Long mediaId, Authentication auth) {
        var acc = (Account) auth.getPrincipal();
        return ResponseEntity.ok().body(service.insert(review, mediaId, acc.getId()));
    }
    
    @PutMapping
    public ResponseEntity<String> updateReview(@RequestBody Review review, Authentication auth) {
        service.update(review, review.getId());
        return ResponseEntity.ok().body("Updated review.");
    }
    
    @DeleteMapping(value = "/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId, Authentication auth) {
        service.delete(reviewId);
        return ResponseEntity.ok().body("Review deleted.");
    }
}
