/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.muramasa.models.Follower;
import com.gabriel.muramasa.models.Account;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 *
 * @author gabriell9090
 */
public interface FollowerRepository extends JpaRepository<Follower, Long>{
    Page<Follower> findByFrom(Account acc, Pageable pageable);
    Page<Follower> findByTo(Account acc, Pageable pageable);
    Optional<Follower> findBySearchParameter(String searchParameter);
}
