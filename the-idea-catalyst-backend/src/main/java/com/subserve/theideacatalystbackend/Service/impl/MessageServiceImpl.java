package com.subserve.theideacatalystbackend.Service.impl;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import com.subserve.theideacatalystbackend.Repository.MessageRepository;
import com.subserve.theideacatalystbackend.Service.MessageService;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
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
        List<MessageEntity> list1 = messageRepository.findByMessageSenderAndMessageReceiver(sender, receiver);
        List<MessageEntity> list2 = messageRepository.findByMessageSenderAndMessageReceiver(receiver,sender);
        list1.addAll(list2);
        Collections.sort(list1, new Comparator<MessageEntity>() {
            @Override
            public int compare(MessageEntity p1, MessageEntity p2) {
                return p1.getId().compareTo(p2.getId());
            }
        });
        System.out.println("SIZE OF LIST OF MESSAGES IS: "+list1.size());
        for (int i = 0; i<list1.size();i++){
            System.out.println(list1.get(i).getId());
        }
        return list1;
    }

}
