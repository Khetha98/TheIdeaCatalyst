import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";

const colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];

const Chat = ({ currentUser, targetUser, messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        const combinedChannel =
          currentUser.name < targetUser.name
            ? `${currentUser.name}_${targetUser.name}`
            : `${targetUser.name}_${currentUser.name}`;

        client.subscribe(`/topic/messages/${combinedChannel}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          // Only add the message to state if the sender is not the current user
          if (newMessage.sender !== currentUser.name) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        });

        console.log("Subscribed to channel:", combinedChannel);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
        console.log("Disconnected from WebSocket");
      }
    };
  }, [currentUser.name, targetUser.name, setMessages]);

  const getAvatarColor = (messageSender) => {
    if (!messageSender) {
      return "#000";
    }

    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const sendMessage = () => {
    if (!message.trim() || !stompClient) return;

    const newMessage = {
      sender: currentUser.name,
      receiver: targetUser.name,
      content: message,
    };

    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(newMessage),
    });

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <Box>
      <Text fontSize="xl" mb="4">
        Chat with {targetUser.name}
      </Text>
      <VStack spacing="4">
        {messages.map((msg, index) => (
          <Box
            key={index}
            alignSelf={
              msg.sender === currentUser.name ? "flex-end" : "flex-start"
            }
            p="2"
            bg="gray.100"
            borderRadius="lg"
            maxW="70%"
          >
            <HStack>
              {msg.sender !== currentUser.name && msg.sender && (
                <span
                  style={{
                    // backgroundColor: getAvatarColor(msg.sender),
                    borderRadius: "50%",
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    textAlign: "center",
                    lineHeight: "24px",
                    marginRight: "8px",
                  }}
                >
                  {msg.sender}
                </span>
              )}
              <Text>{msg.content}</Text>
              {msg.sender === currentUser.name && (
                <span
                  style={{
                    // backgroundColor: getAvatarColor(msg.sender),
                    borderRadius: "50%",
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    textAlign: "center",
                    lineHeight: "24px",
                    marginLeft: "8px",
                  }}
                >
                  {msg.sender}
                </span>
              )}
            </HStack>
          </Box>
        ))}
        {currentUser && (
          <HStack>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <Button onClick={sendMessage}>Send</Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default Chat;
