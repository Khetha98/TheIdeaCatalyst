import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Button } from "@chakra-ui/react";

const UserList = ({ excludeUser, onUserClick, isLoggedIn }) => {
  const [users, setUsers] = useState([]);

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
                onClick={() => isLoggedIn && onUserClick(user)}
                isDisabled={!isLoggedIn}
              >
                {user.name}
              </Button>
            </Box>
          ))
      ) : (
        <Text>No users found</Text>
      )}
    </Box>
  );
};

export default UserList;
