/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.dto;

/**
 *
 * @author gabriell9090
 */
public abstract class AccountDTO {
    private String email;
    private String username;
    private String password;
    public AccountDTO() {}
    public AccountDTO(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
    public boolean isEmailValid() {
        return email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }
    
    public boolean isPasswordValid() {
        return password.length() >= 6;
    }
    
    public boolean isUsernameValid() {
        return username.length() >= 4;
    }
}
