import { Box, Button, Container, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

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
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Call your backend to create a Payment Intent
    // try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000, currency: "usd" }),
    });

    const { clientSecret, error } = await response.json();

    if (error) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    // Confirm the payment on the client-side
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message || "Payment failed");
      setLoading(false);
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        // Payment was successful, update the database
        await fetch("/api/update-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
            name: "Customer Name", // Replace with actual customer name
            email: "customer@example.com", // Replace with actual customer email
            shippingAddress: "123 Example St, City, Country", // Replace with actual shipping address
          }),
        });

        setSuccess(true);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <Box>
        <CardElement />
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
      </Button>
    </form>
  );
}

function Buy() {
  return (
    <Container as={Stack} maxW={"6xl"} w="500" py={56} mt={56} align={"center"}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
}

export default Buy;
