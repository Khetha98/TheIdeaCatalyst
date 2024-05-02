package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;

public interface MessageService {

    MessageEntity sendMessage(MessageEntity messageEntity);
}
