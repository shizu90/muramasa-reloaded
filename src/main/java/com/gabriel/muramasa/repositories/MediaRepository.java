/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gabriel.muramasa.models.Media;
import com.gabriel.muramasa.models.MediaList;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 *
 * @author gabriell9090
 */
@Repository
public interface MediaRepository extends JpaRepository<Media, Long>{
    Page<Media> findByListAndStatus(MediaList list, Integer status, Pageable pageable);
    Optional<Media> findByCodeAndList(Long code, MediaList list);
}
