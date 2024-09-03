import { Box, Button, Container, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import PurchaseForm from "components/PurchaseForm/PurchaseForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
);

function Success() {
  return (
    <Container maxW="full" mt={4} centerContent>
      <h1>Purchase successful</h1>
    </Container>
  );
}

export default Success;
