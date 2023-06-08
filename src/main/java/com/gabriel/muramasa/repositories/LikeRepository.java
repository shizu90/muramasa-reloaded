/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriel.muramasa.models.Like;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Post;
import java.util.Optional;

/**
 *
 * @author giraf
 */
public interface LikeRepository extends JpaRepository<Like, Long>{
    Optional<Like> findByLikedByAndPost(Account account, Post post);
}
