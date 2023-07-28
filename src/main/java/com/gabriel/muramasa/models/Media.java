/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 *
 * @author gabriell9090
 */

@Entity
@Table(name = "muramasa_media")
public class Media implements Serializable {
    private static final long serialVersionUID = 1L;

    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long code;
    private String name;
    private String imgUrl;
    private String type;
    private Integer favorited;
    private Integer count;
    private Integer length;
    private Integer status; //1 - WATCHING/READING; 2 - COMPLETED; 3 - PLANS TO WATCH/READ; 4 - DROPPED; 5 - ON HOLD;
    private Double score;
    
    //Relations
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "list_id")
    private MediaList list;
    @OneToOne(mappedBy = "media")
    @JoinColumn(name = "review_Id")
    private Review review;
    
    public Media() {}
    public Media(
            Long id, Long code, MediaList list, String name, Integer count, Integer length, 
            Integer status, String imgUrl, String type, Integer favorited, Double score, Review review) {
        this.id = id;
        this.code = code;
        this.list = list;
        this.name = name;
        this.count = count;
        this.length = length;
        this.status = status > 5 ? 5 : status < 1 ? 1 : status;
        this.imgUrl = imgUrl;
        this.type = type;
        this.favorited = favorited;
        this.score = score;
        this.review = review;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public MediaList getList() {
        return list;
    }

    public void setList(MediaList list) {
        this.list = list;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getImgUrl() {
        return imgUrl;
    }
    
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
    
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Integer getFavorited() {
        return favorited;
    }
    
    public void setFavorited(Integer favorited) {
        this.favorited = favorited;
    }
    
    public Double getScore() {
        return score;
    }
    
    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 5;
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
        final Media other = (Media) obj;
        return Objects.equals(this.id, other.id);
    }
    
    
}
