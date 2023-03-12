package com.gabriel.muramasa.dto;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author gabriell9090
 */
public class AccountRegistrationDTO extends AccountDTO {
    private String confirmPassword;
    
    public AccountRegistrationDTO() {}
    public AccountRegistrationDTO(String email, String username, String password, String confirmPassword) {
        super(email, username, password);
        this.confirmPassword = confirmPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    
    public boolean isPasswordsMatches() {
        return this.getPassword().equals(confirmPassword);
    }
    

}
