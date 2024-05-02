package com.subserve.theideacatalystbackend.Repository;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {

}
