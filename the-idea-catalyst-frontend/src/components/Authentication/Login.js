import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    const loginData = {
      name,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/user/login",
        loginData
      );
      if (response.data === "Login successful!") {
        // Assuming the response contains user data
        const user = { name }; // Adjust according to actual user data from response
        onLoginSuccess(user);
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
