import React, { useState } from "react";
import { Box, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
import axios from "axios";

const Chat = ({ currentUser, targetUser, onUserClick }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = async (user, loggedInUser) => {
    console.log("INSIDE THE FUNCTION THAT FETCHES MESSAGES FROM SERVER");
    setSelectedUser(user);
    onUserClick(user);

    try {
      const response = await axios.get(
        "http://localhost:8081/message/get_messages/" +
          loggedInUser.name +
          "/" +
          user.name
        // `http://localhost:8081/messages/${loggedInUser}/${user}`
      );
      console.log(response);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      messageSender: currentUser.name,
      messageReceiver: targetUser.name,
      content: message,
    };

    try {
      console.log();
      const response = await axios.post(
        "http://localhost:8081/message/send_message",
        newMessage
      );
      if (response.data) {
        setMessages([...messages, newMessage]);
        // handleUserClick(targetUser, currentUser);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Box>
      <Text fontSize="xl" mb="4">
        Chat with {targetUser.name}
      </Text>
      <Box>
        {selectedUser && (
          <Box mt="4">
            <Text fontSize="xl" mb="2">
              Messages with {currentUser.name}
            </Text>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Box key={index} p="2" borderBottom="1px solid #ccc">
                  <div>{message.content}</div>
                </Box>
              ))
            ) : (
              <Text>No previous messages found</Text>
            )}
          </Box>
        )}
      </Box>
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
          >
            <Text>{msg.content}</Text>
            <Text fontSize="sm" color="gray.500">
              - {msg.sender}
            </Text>
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
