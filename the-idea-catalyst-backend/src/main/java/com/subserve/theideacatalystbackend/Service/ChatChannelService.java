package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.UserChannel;
import com.subserve.theideacatalystbackend.Repository.UserChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatChannelService {

    private final UserChannelRepository userChannelRepository;

    @Autowired
    public ChatChannelService(UserChannelRepository userChannelRepository) {
        this.userChannelRepository = userChannelRepository;
    }

    public String getOrCreateChannel(String user1, String user2) {
        String combinedChannel = combineUsers(user1, user2);
        return userChannelRepository.findByChannel(combinedChannel)
                .orElseGet(() -> userChannelRepository.save(new UserChannel(combinedChannel)))
                .getChannel();
    }

    private String combineUsers(String user1, String user2) {
        return user1.compareTo(user2) < 0 ? user1 + "_" + user2 : user2 + "_" + user1;
    }
}
