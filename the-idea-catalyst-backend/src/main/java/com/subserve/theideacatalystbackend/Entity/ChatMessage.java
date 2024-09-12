package com.subserve.theideacatalystbackend.Entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private String sender;
    private String receiver;
    private MessageType type;
    private String content;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}

