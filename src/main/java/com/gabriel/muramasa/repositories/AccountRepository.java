/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriel.muramasa.models.Account;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 *
 * @author gabriell9090
 */

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{
    List<Account> findByUsername(String username);
    List<Account> findByEmail(String email);
}
