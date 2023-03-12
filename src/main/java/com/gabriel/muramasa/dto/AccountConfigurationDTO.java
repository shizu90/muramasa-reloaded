/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.dto;

/**
 *
 * @author gabriell9090
 */
public class AccountConfigurationDTO extends AccountDTO {
    private String resume;
    private String imgUrl;
    private String bannerImgUrl;
    
    public AccountConfigurationDTO() {}

    public AccountConfigurationDTO(String username, String email, String password, String resume, String imgUrl, String bannerImgUrl) {
        super(email, username, password);
        this.resume = resume;
        this.imgUrl = imgUrl;
        this.bannerImgUrl = bannerImgUrl;
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
    
    
    
}
