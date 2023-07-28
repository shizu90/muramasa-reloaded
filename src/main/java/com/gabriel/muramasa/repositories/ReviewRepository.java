/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.stereotype.Repository;
import com.gabriel.muramasa.models.Review;
import com.gabriel.muramasa.models.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author giraf
 */

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
    Page<Review> findByCode(Long code, Pageable pageable);
    Page<Review> findByReviewer(Account account, Pageable pageable);
}
