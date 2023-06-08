/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriel.muramasa.models.Reply;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Post;
import java.util.Optional;

/**
 *
 * @author giraf
 */
public interface ReplyRepository extends JpaRepository<Reply, Long>{
    Optional<Reply> findByCreatorAndPost(Account creator, Post post);
}
