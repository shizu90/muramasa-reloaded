/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gabriel.muramasa.models;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author gabriell9090
 */

@Entity
@Table(name = "muramasa_media")
public class Media implements Serializable {
    private static final long serialVersionUID = 1L;

    //Common attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private String imgUrl;
    private String type;
    private Integer count;
    private Integer status; //1 - WATCHING/READING; 2 - COMPLETED; 3 - PLANS TO WATCH/READ; 4 - DROPPED; 5 - ON HOLD;
    
    //Relations
    @ManyToOne
    @JoinColumn(name = "list_id")
    private MediaList list;
    
    public Media() {}
    public Media(Integer id, MediaList list, String name, String description, Integer count, Integer status, String imgUrl, String type) {
        this.id = id;
        this.list = list;
        this.name = name;
        this.description = description;
        this.count = count;
        this.status = status > 5 ? 5 : status < 1 ? 1 : status;
        this.imgUrl = imgUrl;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MediaList getList() {
        return list;
    }

    public void setList(MediaList list) {
        this.list = list;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImgUrl() {
        return imgUrl;
    }
    
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 97 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Media other = (Media) obj;
        return Objects.equals(this.id, other.id);
    }
    
    
}
