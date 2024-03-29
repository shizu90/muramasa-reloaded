/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author shizu90
 * 
 */

@Entity
@Table(name = "muramasa_account")
public class Account implements Serializable, UserDetails {
    private static final long serialVersionUID = 1L;
    
    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String imgUrl;
    private String bannerImgUrl;
    private String resume;
    private String createdAt;
    
    //Relations
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "animeList_id")
    private MediaList animeList;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "mangaList_id")
    private MediaList mangaList;
    @OneToMany(targetEntity = Follower.class, mappedBy = "to")
    @JsonIgnore
    private List<Follower> followers;
    @OneToMany(targetEntity = Follower.class, mappedBy = "from")
    @JsonIgnore
    private List<Follower> following;
    @OneToMany(targetEntity = Log.class, mappedBy = "account")
    @JsonIgnore
    private List<Log> recentUpdates;
    @OneToMany(targetEntity = Post.class, mappedBy = "creator")
    @JsonIgnoreProperties({"replies", "creator"})
    private List<Post> posts;
    @OneToMany(targetEntity = Like.class, mappedBy = "likedBy")
    @JsonIgnore
    private List<Like> likes;
    @OneToMany(targetEntity = Character.class, mappedBy = "favorited")
    @JsonIgnore
    private List<Character> favoritedCharacters;
    @OneToMany(targetEntity = Review.class, mappedBy = "reviewer")
    @JsonIgnore
    private List<Review> reviews;
            
    public Account() {}
    public Account(
            Long id, String username, String email, 
            String password, String imgUrl, String bannerImgUrl, 
            String resume, String createdAt, MediaList animeList, MediaList mangaList,
            List<Follower> followers, List<Follower> following, List<Log> recentUpdates, 
            List<Post> posts, List<Like> likes, List<Character> favoritedCharacters, List<Review> reviews) 
    
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
        this.resume = resume;
        this.createdAt = createdAt;
        this.animeList = animeList;
        this.mangaList = mangaList;
        this.followers = followers;
        this.following = following;
        this.recentUpdates = recentUpdates;
        this.posts = posts;
        this.likes = likes;
        this.favoritedCharacters = favoritedCharacters;
        this.reviews = reviews;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
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

    @Override
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
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
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
    
    public List<Follower> getFollowers() {
        return followers;
    }
    
    public void setFollowers(List<Follower> followers) {
        this.followers = followers;
    }
    
    public List<Follower> getFollowing() {
        return following;
    }
    
    public void setFollowing(List<Follower> following) {
        this.following = following;
    }
    
    public List<Log> getRecentUpdates() {
        return recentUpdates;
    }
    
    public void setRecentUpdates(List<Log> recentUpdates) {
        this.recentUpdates = recentUpdates;
    }
    
    public List<Post> getPosts() {
        return posts;
    }
    
    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }
    
    public List<Character> getFavoritedCharacters() {
        return favoritedCharacters;
    }

    public void setFavoritedCharacters(List<Character> favoritedCharacters) {
        this.favoritedCharacters = favoritedCharacters;
    }
    
    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
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
        final Account other = (Account) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
