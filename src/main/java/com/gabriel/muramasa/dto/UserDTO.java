/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.dto;

import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.models.MediaList;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.Character;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author gabriell9090
 */
public class UserDTO {
    private Long id;
    private String username;
    private String resume;
    private String createdAt;
    private String imgUrl;
    private String bannerImgUrl;
    private Integer animeListCount;
    private Integer mangaListCount;
    private Long animeListId;
    private Long mangaListId;
    private Integer followersCount;
    private Integer followingCount;
    private List<Log> recentUpdates;
    private List<Post> posts;
    private List<Character> favoriteCharacters;
    private List<Media> favoriteAnimes = new ArrayList<Media>();
    private List<Media> favoriteMangas = new ArrayList<Media>();
    
    public UserDTO() {}
    public UserDTO(
            Long id, String username, String resume, String createdAt, String imgUrl, String bannerImgUrl, 
            MediaList animeList, MediaList mangaList, List<Follower> followers, 
            List<Follower> following, List<Log> recentUpdates, List<Post> posts, 
            List<Character> favoriteCharacters, List<Media> favoriteAnimes, List<Media> favoriteMangas) {
        this.id = id;
        this.username = username;
        this.resume = resume;
        this.createdAt = createdAt;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
        this.animeListCount = animeList.getItems().size();
        this.mangaListCount = mangaList.getItems().size();
        this.followersCount = followers.size();
        this.followingCount = following.size();
        this.recentUpdates = recentUpdates;
        this.animeListId = animeList.getId();
        this.mangaListId = mangaList.getId();
        this.posts = posts;
        this.favoriteCharacters = favoriteCharacters;
        this.favoriteAnimes = favoriteAnimes;
    }
    public UserDTO(Account acc) {
        this.id = acc.getId();
        this.username = acc.getUsername();
        this.resume = acc.getResume();
        this.createdAt = acc.getCreatedAt();
        this.imgUrl = acc.getImgUrl();
        this.bannerImgUrl = acc.getBannerImgUrl();
        this.animeListCount = acc.getAnimeList().getItems().size();
        this.mangaListCount = acc.getMangaList().getItems().size();
        this.followersCount = acc.getFollowers().size();
        this.followingCount = acc.getFollowing().size();
        this.recentUpdates = acc.getRecentUpdates();
        this.animeListId = acc.getAnimeList().getId();
        this.mangaListId = acc.getMangaList().getId();
        this.posts = acc.getPosts();
        this.favoriteCharacters = acc.getFavoritedCharacters();
        acc.getAnimeList().getItems().forEach((Media md) -> {
            if(md.getFavorited() == 1) this.favoriteAnimes.add(md);
        });
        acc.getMangaList().getItems().forEach((Media md) -> {
            if(md.getFavorited() == 1) this.favoriteMangas.add(md);
        });
    }

    public Long getId() {
        return id;
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
    
    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
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
    
    public Long getAnimeListId() {
        return animeListId;
    }

    public Long getMangaListId() {
        return mangaListId;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Character> getFavoriteCharacters() {
        return favoriteCharacters;
    }

    public void setFavoriteCharacters(List<Character> favoriteCharacters) {
        this.favoriteCharacters = favoriteCharacters;
    }

    public List<Media> getFavoriteAnimes() {
        return favoriteAnimes;
    }

    public void setFavoriteAnimes(List<Media> favoriteAnimes) {
        this.favoriteAnimes = favoriteAnimes;
    }

    public List<Media> getFavoriteMangas() {
        return favoriteMangas;
    }

    public void setFavoriteMangas(List<Media> favoriteMangas) {
        this.favoriteMangas = favoriteMangas;
    }
    
    
}
