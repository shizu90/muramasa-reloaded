/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.dto;

import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.MediaList;
import java.util.List;

/**
 *
 * @author gabriell9090
 */
public class UserDTO {
    private String username;
    private String resume;
    private String imgUrl;
    private String bannerImgUrl;
    private MediaList animeList;
    private MediaList mangaList;
    private List<Follower> followers;
    private List<Follower> following;
    
    public UserDTO() {}
    public UserDTO(String username, String resume, String imgUrl, String bannerImgUrl, MediaList animeList, MediaList mangaList, List<Follower> followers, List<Follower> following) {
        this.username = username;
        this.resume = resume;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
        this.animeList = animeList;
        this.mangaList = mangaList;
        this.followers = followers;
        this.following = following;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
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
    
    
    
}
