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
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author giraf
 */

@Entity
@Table(name = "muramasa_reply")
public class Reply implements Serializable {
    private static final long serialVersionUID = 1L;
    
    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private String attachedImgs;
    
    //Relations
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "account_id")
    private Account creator;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "post_id")
    private Post post;
    
    public Reply() {}

    public Reply(Long id, String text, String attachedImgs, Account creator, Post post) {
        this.id = id;
        this.text = text;
        this.attachedImgs = attachedImgs;
        this.creator = creator;
        this.post = post;
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

    public String getAttachedImgs() {
        return attachedImgs;
    }

    public void setAttachedImgs(String attachedImgs) {
        this.attachedImgs = attachedImgs;
    }

    public Account getCreator() {
        return creator;
    }

    public void setCreator(Account creator) {
        this.creator = creator;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 37 * hash + Objects.hashCode(this.id);
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
        final Reply other = (Reply) obj;
        return Objects.equals(this.id, other.id);
    }
}
