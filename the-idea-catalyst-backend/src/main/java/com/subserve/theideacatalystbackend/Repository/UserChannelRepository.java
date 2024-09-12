package com.subserve.theideacatalystbackend.Repository;

import com.subserve.theideacatalystbackend.Entity.UserChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {
    Optional<UserChannel> findByChannel(String channel);
}
