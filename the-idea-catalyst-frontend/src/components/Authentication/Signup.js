import { Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [password, setPassword] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [zipcode, setZipcode] = useState();
    const [pic, setPic] = useState()

    const handleClick = () => setShow(!show);

  const postDetails = (pics) => { };
  const submitHandler = () => { };


  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="surname" isRequired>
        <FormLabel>Surname</FormLabel>
        <Input
          placeholder="Enter your surname"
          onChange={(e) => setSurname(e.target.value)}
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
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="street" isRequired>
        <FormLabel>Street</FormLabel>
        <Input
          placeholder="Enter your street address"
          onChange={(e) => setStreet(e.target.value)}
        />
      </FormControl>
      <FormControl id="city" isRequired>
        <FormLabel>City</FormLabel>
        <Input
          placeholder="Enter your city"
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          placeholder="Enter your sate/Province"
          onChange={(e) => setState(e.target.value)}
        />
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Input
          placeholder="Enter your country"
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormControl>
      <FormControl id="zipCode" isRequired>
        <FormLabel>Zip Code</FormLabel>
        <Input
          placeholder="Enter your zip code"
          onChange={(e) => setZipcode(e.target.value)}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          //   placeholder="Enter your zip code"
          onChange={(e) => postDetails(e.target.files(0))}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onclick={submitHandler}
          >
              Sign up
      </Button>
    </VStack>
  );
}

export default Signup