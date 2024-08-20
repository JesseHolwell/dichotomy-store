import { Button } from "@chakra-ui/react";
import React from "react";

function Buy() {
  return (
    <Button
      rounded={"full"}
      size={"lg"}
      fontWeight={"normal"}
      px={6}
      colorScheme={"orange"}
      bg={"orange.400"}
      _hover={{ bg: "orange.500" }}
      onClick={() => {
        // buy the thing
      }}
    >
      Buy the dichotomy card game
    </Button>
  );
}

export default Buy;
