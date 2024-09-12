import React from "react";
import { Container, Box, Text, Button, VStack } from "@chakra-ui/react";
import "./LandingPage.css"; // Import the CSS file

const LandingPage = () => {
  return (
    <Container maxW="full" centerContent className="landing-page">
      <Box className="content">
        <Text fontSize="4xl" fontWeight="bold">
          Welcome to TheIdeaCatalyst
        </Text>
        <Text fontSize="lg" mt="4">
          Have an idea in mind, at TheIdeaCatalyst we got you .
        </Text>
        <VStack spacing="4" mt="4" className="button-container">
          <a
            href="https://your-deployed-app.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            View Live App
          </a>
          <a
            href="https://github.com/Khetha98/TheIdeaCatalyst"
            target="_blank"
            rel="noopener noreferrer"
            className="button accent"
          >
            View on GitHub
          </a>
        </VStack>
      </Box>
    </Container>
  );
};

export default LandingPage;
