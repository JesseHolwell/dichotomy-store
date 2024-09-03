import { CardElement } from "@stripe/react-stripe-js";
import { useTheme } from "@chakra-ui/react";

const StyledCardElement = () => {
  const theme = useTheme();

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

  return (
    <CardElement options={{ style: cardElementStyles, disableLink: true }} />
  );
};

export default StyledCardElement;
