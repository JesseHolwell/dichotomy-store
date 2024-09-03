import { Box, Button, Container, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import PurchaseForm from "components/PurchaseForm/PurchaseForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
);

function setLoading(value: boolean) {
  console.log("set loading", value);
}

function setErrorMessage(value: string) {
  console.log("set error", value);
}

function setSuccess(value: boolean) {
  console.log("set success", value);
}

function CheckoutForm() {
  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <form onSubmit={handleClick}>
      {/* <Box>
      </Box>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        px={6}
        mx={32}
        my={32}
        colorScheme={"orange"}
        bg={"orange.400"}
        _hover={{ bg: "orange.500" }}
        type="submit"
      >
        Buy the Dichotomy card game
      </Button> */}
    </form>
  );
}

function Buy() {
  return (
    // <Container as={Stack} maxW={"6xl"} w="500" py={56} mt={56} align={"center"}>
    //   <Elements stripe={stripePromise}>
    //     <CheckoutForm />
    //   </Elements>
    // </Container>
    <Container
      maxW="full"
      mt={4}
      centerContent
      // overflow="hidden"
    >
      <Elements stripe={stripePromise}>
        <PurchaseForm />
      </Elements>
    </Container>
  );
}

export default Buy;
