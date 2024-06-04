package com.subserve.theideacatalystbackend.Repository;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByMessageSenderAndMessageReceiver(String sender, String receiver);
}
