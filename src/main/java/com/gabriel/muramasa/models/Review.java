/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author giraf
 */

@Entity
@Table(name = "muramasa_review")
public class Review implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private Double score;
    private Long code;
    private String reviewedAt;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Account reviewer;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "media_id")
    private Media media;
    
    public Review() {}
    public Review(Long id, String text, Double score, String reviewedAt, Account reviewer, Media media) {
        this.id = id;
        this.text = text;
        this.score = score;
        this.reviewedAt = reviewedAt;
        this.reviewer = reviewer;
        this.media = media;
        this.code = media.getCode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(String reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public Account getReviewer() {
        return reviewer;
    }

    public void setReviewer(Account reviewer) {
        this.reviewer = reviewer;
    }

    public Media getMedia() {
        return media;
    }

    public void setMedia(Media media) {
        this.media = media;
    }
    
    public Long getCode() {
        return code;
    }
    
    public void setCode(Long code) {
        this.code = code;
    }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Review other = (Review) obj;
        return Objects.equals(this.id, other.id);
    }
    
    
}
