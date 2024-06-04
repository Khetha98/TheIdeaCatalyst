package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;

import java.util.List;

public interface MessageService {
    MessageEntity sendMessage(MessageEntity messageEntity);
    List<MessageEntity> getMessages(String sender, String receiver);
}


