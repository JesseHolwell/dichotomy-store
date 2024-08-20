import { Box } from "@chakra-ui/react";
import { isFeatureEnabled } from "util/featureToggle";
import Hero from "components/Hero";
import "./Home.css";
import MailingList from "components/MailingList";
import ProductDetails from "components/ProductDetails";

function Home() {
  return (
    <Box overflow="hidden">
      <Box overflow="hidden">
        <Hero></Hero>
      </Box>
      <ProductDetails></ProductDetails>

      {/* {isFeatureEnabled("canPurchase") && <Contact></Contact>} */}
      {isFeatureEnabled("canJoinMailingList") && <MailingList></MailingList>}
    </Box>
  );
}

export default Home;
