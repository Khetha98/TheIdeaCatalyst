package com.subserve.theideacatalystbackend.Service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatChannelService {

    private final Map<String, String> userChannels = new HashMap<>();

    public String getOrCreateChannel(String user1, String user2) {
        String combinedChannel = combineUsers(user1, user2);
        return userChannels.computeIfAbsent(combinedChannel, k -> combinedChannel);
    }

    private String combineUsers(String user1, String user2) {
        return user1.compareTo(user2) < 0 ? user1 + "_" + user2 : user2 + "_" + user1;
    }
}
