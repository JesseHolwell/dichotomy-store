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

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Disable form submission until Stripe.js has loaded
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/v1/purchase/createPaymentIntent`,
        {
          // TODO: real values
          amount: 999,
          currency: "AUD",
        }
      );

      const { clientSecret } = response.data;

      if (!clientSecret) {
        throw new Error("Client secret is missing from the response.");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        console.error("Payment failed", result.error);
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded");

        const response = await axios.post(
          `${apiUrl}/v1/purchase/savePurchase`,
          {
            stripeTransactionId: result.paymentIntent.id,
            amount: result.paymentIntent.amount,
            name: "Web Test",
            email: "web@test.com",
            phone: "0404404404",
            shippingAddress: "the world wide web",
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
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
