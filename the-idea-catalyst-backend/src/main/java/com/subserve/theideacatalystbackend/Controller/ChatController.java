package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.ChatMessage;
import com.subserve.theideacatalystbackend.Service.ChatChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatChannelService chatChannelService;

    @Autowired
    public ChatController(SimpMessageSendingOperations messagingTemplate, ChatChannelService chatChannelService) {
        this.messagingTemplate = messagingTemplate;
        this.chatChannelService = chatChannelService;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        String channel = chatChannelService.getOrCreateChannel(chatMessage.getSender(), chatMessage.getReceiver());
        messagingTemplate.convertAndSend("/topic/messages/" + channel, chatMessage);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage) {
        System.out.println("User added: " + chatMessage);
        return chatMessage;
    }
}
