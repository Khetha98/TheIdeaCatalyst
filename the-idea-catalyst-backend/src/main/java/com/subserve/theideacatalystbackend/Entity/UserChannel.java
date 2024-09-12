package com.subserve.theideacatalystbackend.Entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "user_channels")
public class UserChannel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String channel;

    public UserChannel() {
    }

    public UserChannel(String channel) {
        this.channel = channel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }
}
