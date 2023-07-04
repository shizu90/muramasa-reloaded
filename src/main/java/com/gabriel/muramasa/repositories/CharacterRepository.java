/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriel.muramasa.models.Character;
import java.util.Optional;

/**
 *
 * @author giraf
 */
public interface CharacterRepository extends JpaRepository<Character, Long>{
    Optional<Character> findByCode(Long code);
}
