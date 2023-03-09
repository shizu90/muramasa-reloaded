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
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author shizu90
 * 
 */

@Entity
@Table(name = "muramasa_user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String email;
    private String password;
    private String imgUrl;
    private String bannerImgUrl;
    private String resume;
    
    //Relations
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "animeList_id")
    private MediaList animeList;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "mangaList_id")
    private MediaList mangaList;
    @OneToMany(mappedBy = "following")
    private List<User> followers;
    @OneToMany(mappedBy = "followers")
    private List<User> following;
    
    public User() {}
    public User(
            Integer id, String username, String email, 
            String password, String imgUrl, String bannerImgUrl, 
            String resume, MediaList animeList, MediaList mangaList, 
            ArrayList<User> followers, ArrayList<User> following) 
    
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
        this.resume = resume;
        this.animeList = animeList;
        this.mangaList = mangaList;
        this.followers = followers;
        this.following = following;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getImgUrl() {
        return imgUrl;
    }
    
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
    
    public String getBannerImgUrl() {
        return bannerImgUrl;
    }
    
    public void setBannerImgUrl(String bannerImgUrl) {
        this.bannerImgUrl = bannerImgUrl;
    }
    
    public String getResume() {
        return resume;
    }
    
    public void setResume(String resume) {
        this.resume = resume;
    }
    
    public MediaList getAnimeList() {
        return animeList;
    }
    
    public void setAnimeList(MediaList animeList) {
        this.animeList = animeList;
    }
    
    public MediaList getMangaList() {
        return mangaList;
    }
    
    public void setMangaList(MediaList mangaList) {
        this.mangaList = mangaList;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(ArrayList<User> followers) {
        this.followers = followers;
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(ArrayList<User> following) {
        this.following = following;
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
        final User other = (User) obj;
        return Objects.equals(this.id, other.id);
    }
    
    
}
