/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gabriel.muramasa.handlers.exceptions.DatabaseException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author giraf
 */

@Entity
@Table(name = "muramasa_post")
public class Post implements Serializable, Comparable<Post> {
    private static final long serialVersionUID = 1L;
    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private String attach;
    private Integer likeCount;
    private String date;
    
    //Relations
    @ManyToOne
    @JoinColumn(name = "user_Id")
    @JsonIgnoreProperties({"followers", "following", "email", "password", "mangaList", "animeList", "posts", "authorities", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
    private Account creator;
    @OneToMany(targetEntity = Like.class, mappedBy = "post")
    @JsonIgnore
    private List<Like> likes;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Post parent;
    @OneToMany(targetEntity = Post.class, mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Post> replies;

    public Post() {}
    
    public Post(Long id, String text, String attach, String date, Account creator, List<Like> likes, Post parent, List<Post> replies) {
        this.id = id;
        this.text = text;
        this.attach = attach;
        this.likes = likes;
        this.likeCount = this.likes.size();
        this.date = date;
        this.creator = creator;
        this.parent = parent;
        this.replies = replies;
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

    public String getAttach() {
        return attach;
    }

    public void setAttach(String attach) {
        this.attach = attach;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }
    
    public Account getCreator() {
        return creator;
    }

    public void setCreator(Account creator) {
        this.creator = creator;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    public Post getParent() {
        return parent;
    }

    public void setParent(Post parent) {
        this.parent = parent;
    }

    public List<Post> getReplies() {
        return replies;
    }

    public void setReplies(List<Post> replies) {
        this.replies = replies;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.id);
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
        final Post other = (Post) obj;
        return Objects.equals(this.id, other.id);
    }
    
    @Override
    public int compareTo(Post post) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        try {
            return formatter.parse(getDate()).compareTo(formatter.parse(post.getDate()));
        } catch (ParseException e) {
            throw new DatabaseException(e.getMessage());
        }
    }
}
