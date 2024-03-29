/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 *
 * @author gabriell9090
 */
@Entity
@Table(name = "muramasa_follower")
public class Follower implements Serializable{
    private final static long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="searchParameter", unique=true)
    private String searchParameter;
    @JsonIgnoreProperties({"followers", "following", "email", "password", "mangaList", "animeList", "authorities", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
    @ManyToOne
    @JoinColumn(name = "to_account")
    private Account from;
    @JsonIgnoreProperties({"followers", "following", "email", "password", "mangaList", "animeList", "authorities", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
    @ManyToOne
    @JoinColumn(name = "from_account")
    private Account to;
    
    public Follower() {}
    public Follower(Account from, Account to) {
        this.from = from;
        this.to = to;
        this.searchParameter = "" + from.hashCode() + to.hashCode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSearchParameter() {
        return this.searchParameter;
    }

    public Account getFrom() {
        return from;
    }

    public void setFrom(Account from) {
        this.from = from;
    }

    public Account getTo() {
        return to;
    }

    public void setTo(Account to) {
        this.to = to;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 59 * hash + Objects.hashCode(this.id);
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
        final Follower other = (Follower) obj;
        return Objects.equals(this.id, other.id);
    }
}
