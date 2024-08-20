import { Button, Container, Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function Buy() {
  const handleClick = async () => {
    try {
      // Access the environment variable
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/v1/purchase/createPurchase`,
        {
          // key: "value", // Replace with your data
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container as={Stack} maxW={"6xl"} py={56} mt={56} align={"center"}>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        px={6}
        colorScheme={"orange"}
        bg={"orange.400"}
        _hover={{ bg: "orange.500" }}
        onClick={handleClick}
      >
        Buy the dichotomy card game
      </Button>
    </Container>
  );
}

export default Buy;
