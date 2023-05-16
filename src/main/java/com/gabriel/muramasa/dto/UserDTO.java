/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.dto;

import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Log;
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
    private Integer animeListCount;
    private Integer mangaListCount;
    private Integer followersCount;
    private Integer followingCount;
    private List<Log> recentUpdates;
    
    public UserDTO() {}
    public UserDTO(
            String username, String resume, String imgUrl, String bannerImgUrl, 
            MediaList animeList, MediaList mangaList, List<Follower> followers, 
            List<Follower> following, List<Log> recentUpdates) {
        this.username = username;
        this.resume = resume;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
        this.animeListCount = animeList.getItems().size();
        this.mangaListCount = mangaList.getItems().size();
        this.followersCount = followers.size();
        this.followingCount = following.size();
        this.recentUpdates = recentUpdates;
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

    public Integer getAnimeListCount() {
        return animeListCount;
    }

    public void setAnimeListCount(Integer animeListCount) {
        this.animeListCount = animeListCount;
    }

    public Integer getMangaListCount() {
        return mangaListCount;
    }

    public void setMangaListCount(Integer mangaListCount) {
        this.mangaListCount = mangaListCount;
    }

    public Integer getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(Integer followersCount) {
        this.followersCount = followersCount;
    }

    public Integer getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(Integer followingCount) {
        this.followingCount = followingCount;
    }
    
    public List<Log> getRecentUpdates() {
        return recentUpdates;
    }

    public void setRecentUpdates(List<Log> recentUpdates) {
        this.recentUpdates = recentUpdates;
    }
    
    
}