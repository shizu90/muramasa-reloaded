/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriel.muramasa.models.Post;
import com.gabriel.muramasa.models.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author giraf
 */
public interface PostRepository extends JpaRepository<Post, Long>{
    Page<Post> findByCreator(Account creator, Pageable pageable);
    Page<Post> findByParent(Post post, Pageable pageable);
    @Query("select p from Post p, Follower f where f.from = :user and p.creator = f.to")
    Page<Post> findByFollowing(@Param("user") Account user, Pageable pageable);
}
