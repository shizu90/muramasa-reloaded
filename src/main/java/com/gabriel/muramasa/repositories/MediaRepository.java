/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gabriel.muramasa.models.Media;

/**
 *
 * @author gabriell9090
 */
@Repository
public interface MediaRepository extends JpaRepository<Media, Integer>{
}
