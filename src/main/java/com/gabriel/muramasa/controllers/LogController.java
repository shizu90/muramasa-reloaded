/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.controllers;

import com.gabriel.muramasa.services.LogService;
import com.gabriel.muramasa.models.Log;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author manou
 */

@RestController
@RequestMapping(value = "/recentupdates")
public class LogController {
    @Autowired
    private LogService service;
    
    @GetMapping(value = "/following/{id}")
    public ResponseEntity<List<Log>> getLogsFromFollowing(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.getLogsFromFollowing(id));
    }
}
