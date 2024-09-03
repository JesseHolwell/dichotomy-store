import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Button,
  useTheme,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import StyledCardElement from "./StyledCardElement";
import FormLegend from "components/PurchaseForm/FormLegend";
import FormField from "components/PurchaseForm/FormField";
import { useModal } from "components/PurchaseForm/ModalContextProvider";
import { useNavigate } from "react-router-dom";
import { cost, currency } from "constants/price";

// const stripePromise = loadStripe(
//   process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
// );

type Inputs = {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
};

const CheckoutForm = (): JSX.Element => {
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  // const { onCheckoutModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const theme = useTheme();

  const DEFAULT_COUNTRY = "AU";
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  const cardElementStyles = {
    // base: {
    //   color: theme.colors.gray[900], // Use a color from your Chakra theme
    //   fontFamily: theme.fonts.body, // Use the default body font
    //   fontSize: theme.fontSizes.md, // Use a medium font size from your theme
    //   "::placeholder": {
    //     color: theme.colors.gray[500], // Style the placeholder color
    //   },
    // },
    // invalid: {
    //   color: theme.colors.red[500], // Style the color when the input is invalid
    // },

    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#fff",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  };

  const handleFormSubmit = async (data: Inputs) => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe or Elements not loaded.");
      return;
    }

    if (!cardComplete) {
      setErrorMessage("Please enter valid card details.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cost, currency: currency }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: data.name,
            email: data.emailAddress,
            address: {
              line1: data.address,
              postal_code: data.postcode,
              city: data.city,
              country: data.country,
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        await fetch("/api/update-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
            name: data.name,
            email: data.emailAddress,
            shippingAddress: `${data.address}, ${data.city}, ${data.country}`,
          }),
        });

        setIsSuccess(true);
        navigate("/success");
        // TODO: send an email invoice to the customer
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      as="form"
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      direction={{ base: "column", lg: "row" }}
      alignItems={{ lg: "start" }}
      spacing={{ base: "2rem" }}
      mt={{ base: "1.5rem" }}
    >
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRadius="0.5rem"
        px={{ base: "1.5rem", sm: "1.75rem", lg: "3rem" }}
        pt={{ base: "1.5rem", sm: "1.875rem", lg: "3.625rem" }}
        pb={{ base: "2rem", lg: "3rem" }}
        maxWidth={{ lg: "45.625rem" }}
        flex={{ lg: "1 1 65%" }}
      >
        <Heading as="h1" fontSize={{ base: "1.75rem" }} mb={{ base: "2rem" }}>
          Checkout
        </Heading>
        <Heading as="h1" fontSize={{ base: "1.5rem" }} mb={{ base: "1.5rem" }}>
          ${cost} {currency}
        </Heading>

        <Box as="fieldset" mb="2rem">
          <FormLegend>Billing Details</FormLegend>
          <SimpleGrid
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
            gridGap={{ base: "1rem" }}
          >
            <FormField
              {...register("name", {
                required: "Field cannot be empty",
                pattern: {
                  value: /^[^<>%$#^*]*$/,
                  message: "Wrong format",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              errors={errors.name}
              label="Name"
              placeholder="Alexei Ward"
            />
            <FormField
              {...register("emailAddress", {
                required: "Field cannot be empty",
                pattern: {
                  value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/,
                  message: "Wrong format",
                },
              })}
              aria-invalid={errors.emailAddress ? "true" : "false"}
              errors={errors.emailAddress}
              label="Email Address"
              type="email"
              placeholder="alexei@mail.com"
            />
            <FormField
              {...register("phoneNumber", {
                required: "Field cannot be empty",
              })}
              aria-invalid={errors.phoneNumber ? "true" : "false"}
              errors={errors.phoneNumber}
              label="Phone Number"
              placeholder="+1 202-555-0136"
            />
          </SimpleGrid>
        </Box>
        <Box as="fieldset" mb="2rem">
          <FormLegend>Shipping Info</FormLegend>
          <SimpleGrid
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
            gridTemplateAreas={{ sm: '"a a" "b c" "d ."' }}
            gridGap={{ base: "1em", sm: "1rem" }}
          >
            <FormField
              {...register("address", {
                required: "Field cannot be empty",
              })}
              aria-invalid={errors.address ? "true" : "false"}
              errors={errors.address}
              gridArea={{ sm: "a" }}
              label="Your Address"
              placeholder="1137 Williams Avenue"
            />
            <FormField
              {...register("postcode", {
                required: "Field cannot be empty",
              })}
              aria-invalid={errors.postcode ? "true" : "false"}
              errors={errors.postcode}
              label="Zip/Postcode"
              // type="email"
              placeholder="1111"
              gridArea={{ sm: "b" }}
            />
            <FormField
              {...register("city", {
                required: "Field cannot be empty",
              })}
              aria-invalid={errors.city ? "true" : "false"}
              errors={errors.city}
              label="City"
              placeholder="New York"
              gridArea={{ sm: "c" }}
            />
            <FormField
              {...register("country", {
                required: "Field cannot be empty",
              })}
              aria-invalid={errors.country ? "true" : "false"}
              errors={errors.country}
              label="Country"
              type="country"
              // placeholder="Australia"
              gridArea={{ sm: "d" }}
            />
            {/* <CountrySelector
              id={"countries"}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={(val) => setCountry(val)}
              // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
              selectedValue={
                COUNTRIES.find(
                  (option) => option.value === country
                ) as SelectMenuOption
              }
            /> */}
            {/* 
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select> */}

            {/* <ReactCountryDropdown
              defaultCountry="JP"
              onSelect={(country) => console.log(country.name)}
            /> */}

            {/* <CountryPicker
              selectedCountry={country}
              setSelectedCountry={setCountry}
              flagsInMenu={true}
              placeholder={"Choose a country"}
            /> */}
          </SimpleGrid>
        </Box>
        <Box as="fieldset">
          <FormLegend>Payment Details</FormLegend>
          <CardElement
            options={{
              style: cardElementStyles,
              disableLink: true,
              hidePostalCode: true,
            }}
            onChange={(event) => setCardComplete(event.complete)}
          />
        </Box>
        <Button
          rounded={"full"}
          size={"lg"}
          fontWeight={"normal"}
          my={8}
          colorScheme={"orange"}
          bg={"orange.400"}
          _hover={{ bg: "orange.500" }}
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading || isSuccess}
        >
          Buy the Dichotomy card game
        </Button>
        {errorMessage && <Box color="red.500">{errorMessage}</Box>}
      </Box>
    </Stack>
  );
};

export default CheckoutForm;
