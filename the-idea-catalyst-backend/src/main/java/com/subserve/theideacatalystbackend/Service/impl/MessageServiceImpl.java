package com.subserve.theideacatalystbackend.Service.impl;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import com.subserve.theideacatalystbackend.Repository.MessageRepository;
import com.subserve.theideacatalystbackend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public MessageEntity sendMessage(MessageEntity messageEntity) {
        messageEntity.setTimestamp(LocalDateTime.now());

        return messageRepository.save(messageEntity);
    }

    @Override
    public List<MessageEntity> getMessages(String sender, String receiver) {
        return messageRepository.findByMessageSenderAndMessageReceiver(sender, receiver);
    }

}
