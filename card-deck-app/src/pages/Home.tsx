import { Box } from "@chakra-ui/react";
import { isFeatureEnabled } from "../util/featureToggle";
import Hero from "../components/Hero";
import "./Home.css";
import MailingList from "../components/MailingList";
import ProductDetails from "../components/ProductDetails";

function Home() {
  return (
    <Box overflow="hidden">
      <Box
        // overflow={{ xs: "hidden" }}
        overflow="hidden"
      >
        <Hero></Hero>
      </Box>
      <ProductDetails></ProductDetails>

      {/* {isFeatureEnabled("canPurchase") && <Contact></Contact>} */}
      {isFeatureEnabled("canJoinMailingList") && <MailingList></MailingList>}

      {/* <BrevoMailList></BrevoMailList> */}

      {/* <h1>Dichotomy cards</h1>
      <p>
        Discover a game that challenges your thinking and sparks meaningful
        conversations. Dichotomy is a unique card game where players delve into
        a world of contrasting ideas, making choices that reveal their deep- est
        values and perspectives. Perfect for gatherings with friends and family,
        Dichotomy is more than just a game—it's an experience.
      </p>
      <hr />
      <p>
        Dichotomy is a thought-provoking card game designed to stimulate
        conversation and reflection. Each card presents two opposing concepts,
        and players must decide which one they align with most. Whether you're
        debating ocean vs. river, illusion vs. delusion, or art vs. science,
        Dichotomy encourages you to explore the nuances of your beliefs and
        preferences.
      </p>
      <div>Sample card component</div>
      <div>Photo of deck</div>
      <div>
        Buy Dichotomy 1 deck of 76 unique cards Packaged in tuck box Guide sheet
        included
      </div>
      <Link to="/buy">Buy now</Link> */}
      {/* <div>Insta logo</div>
      <a href="https://www.instagram.com/dichotomycards/" target="_blank">
        @dichotomycards
      </a> */}
    </Box>
  );
}

export default Home;
