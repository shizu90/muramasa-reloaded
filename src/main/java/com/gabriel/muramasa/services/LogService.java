/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.services;

import com.gabriel.muramasa.handlers.exceptions.NotFoundException;
import com.gabriel.muramasa.repositories.LogRepository;
import com.gabriel.muramasa.repositories.AccountRepository;
import com.gabriel.muramasa.models.Log;
import com.gabriel.muramasa.models.Account;
import com.gabriel.muramasa.models.Follower;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author shizu90
 */

@Service
public class LogService {
    @Autowired
    private LogRepository repo;
    @Autowired
    private AccountRepository accRepo;
    
    public LogService() {}
    
    public void addRecentUpdate(Log log, List<Log> logs) throws ParseException {
        Collections.reverse(logs);
        if(logs.size() >= 5) {
            Log oldestLog = logs.get(logs.size()-1);
        
            for(Log currentLog : logs) {
                SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
                if(formatter.parse(currentLog.getDate()).before(formatter.parse(oldestLog.getDate()))) {
                    oldestLog = currentLog;
                }
            }
            repo.delete(oldestLog);
        }
        repo.save(log);
    }
    
    public List<Log> getLogsFromFollowing(Long userId) {
        Account acc = accRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        List<Log> globalLogs = new ArrayList<Log>();
        
        for(Follower follower : acc.getFollowing()) {
            for(Log log : follower.getTo().getRecentUpdates()) {
                globalLogs.add(log);
            }
        }
        
        return globalLogs;
    }
}
