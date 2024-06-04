import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Button } from "@chakra-ui/react";

const UserList = ({ excludeUser, onUserClick, isLoggedIn }) => {
  const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/user/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // const handleUserClick = async (user, loggedInUser) => {
  //   console.log("INSIDE THE FUNCTION THAT FETCHES MESSAGES FROM SERVER");
  //   setSelectedUser(user);
  //   onUserClick(user);

  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8081/message/get_messages/" +
  //         loggedInUser.name+
  //         "/" +
  //         user.name
  //       // `http://localhost:8081/messages/${loggedInUser}/${user}`
  //     );
  //     console.log(response);
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error("Error fetching messages", error);
  //   }
  // };

  return (
    <Box>
      <Text fontSize="2xl" mb="4">
        Users
      </Text>
      {users.length > 0 ? (
        users
          .filter((user) => user.name !== (excludeUser && excludeUser.name))
          .map((user) => (
            <Box key={user.id} p="2" borderBottom="1px solid #ccc">
              <Button
                variant="link"
                onClick={() => isLoggedIn}
                // onClick={() => isLoggedIn && handleUserClick(user, excludeUser)}
                isDisabled={!isLoggedIn}
              >
                {user.name}
              </Button>
            </Box>
          ))
      ) : (
        <Text>No users found</Text>
      )}
      {/* {selectedUser && (
        <Box mt="4">
          <Text fontSize="xl" mb="2">
            Messages with {selectedUser.name}
          </Text>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <Box key={index} p="2" borderBottom="1px solid #ccc">
                {/* <Text>
                  <strong>{message[2]}:</strong> {message[1]}
                </Text> */}
      {/* <div>
                  {message.content}
                </div>
              </Box>
            ))
          ) : (
            <Text>No messages found</Text>
          )}
        </Box>
      )} */}
    </Box>
  );
};

export default UserList;
