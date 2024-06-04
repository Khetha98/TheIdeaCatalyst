import {
  Container,
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import UserList from "./UserList";
import Chat from "../components/Chat";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setSelectedUser(null);
  };

  // const handleUserClick = async (user, loggedInUser) => {
  //   console.log("INSIDE THE FUNCTION THAT FETCHES MESSAGES FROM SERVER");
  //   // setSelectedUser(user);
  //   // onUserClick(user);

  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8081/message/get_messages/" +
  //         loggedInUser.name +
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
    <Container maxW="full" centerContent>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={3}
        bg={"grey"}
        w="100%"
        m="0 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="3xl"
          fontFamily="Work sans"
          color="black"
          fontWeight={900}
        >
          Theideacatalyst
        </Text>
        <HStack spacing="10px">
          {!loggedInUser ? (
            <>
              <Button size="sm" onClick={handleLoginClick}>
                Login
              </Button>
              <Button size="sm" onClick={handleSignupClick}>
                Sign up
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          )}
        </HStack>
      </Flex>
      <Box w="100%" display="flex">
        <Box
          bg="white"
          w="25%"
          p={4}
          borderRadius="lg"
          color="black"
          borderWidth="1px"
        >
          <UserList
            excludeUser={loggedInUser}
            onUserClick={(user) => setSelectedUser(user)}
            isLoggedIn={!!loggedInUser}
          />
        </Box>
        <Box
          bg="white"
          w="75%"
          p={4}
          borderRadius="lg"
          color="black"
          borderWidth="1px"
        >
          <VStack spacing="1em">
            {showLogin && !loggedInUser && (
              <Box width="100%" mt="4">
                <Login onLoginSuccess={(user) => setLoggedInUser(user)} />
              </Box>
            )}
            {showSignup && (
              <Box width="100%" mt="4">
                <Signup />
              </Box>
            )}
            {selectedUser && loggedInUser && (
              <Box width="100%" mt="4">
                <Chat
                  currentUser={loggedInUser}
                  targetUser={selectedUser}
                  onUserClick={(user) => setSelectedUser(user) }
                />
              </Box>
            )}
            {!loggedInUser && selectedUser && (
              <Box width="100%" mt="4">
                <Text>You need to log in to chat.</Text>
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
