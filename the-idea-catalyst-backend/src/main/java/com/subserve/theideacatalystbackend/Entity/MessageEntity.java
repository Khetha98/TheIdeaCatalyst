package com.subserve.theideacatalystbackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "message_content")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message_sender")
    private String messageSender;

    @Column(name = "message_receiver")
    private String messageReceiver;

    @Column(name = "content")
    private String content;


    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}
