/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author gabriell9090
 */
@Entity
@Table(name = "muramasa_medialist")
public class MediaList implements Serializable {
    private static final long serialVersionUID = 1L;
    
    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    
    //Relations
    @OneToMany(targetEntity=Media.class, mappedBy = "list")
    private List<Media> items;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.REMOVE)
    private Account account;
    
    public MediaList() {}
    public MediaList(Long id, List<Media> items, Account account, String type) {
        this.id = id;
        this.items = items;
        this.account = account;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Media> getItems() {
        return items;
    }

    public void setItems(List<Media> items) {
        this.items = items;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 83 * hash + Objects.hashCode(this.id);
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
        final MediaList other = (MediaList) obj;
        return Objects.equals(this.id, other.id);
    }
}
