/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.dto;

/**
 *
 * @author giraf
 */
public class AuthDTO {
    private Long id;
    private String username;
    private String email;
    private Long animeListId;
    private Long mangaListId;
    private String token;
    
    public AuthDTO() {}
    public AuthDTO(Long id, String username, String email, Long animeListId, Long mangaListId, String token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.animeListId = animeListId;
        this.mangaListId = mangaListId;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Long getAnimeListId() {
        return animeListId;
    }

    public void setAnimeListId(Long animeListId) {
        this.animeListId = animeListId;
    }

    public Long getMangaListId() {
        return mangaListId;
    }

    public void setMangaListId(Long mangaListId) {
        this.mangaListId = mangaListId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    
}
