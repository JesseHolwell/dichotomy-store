"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { isFeatureEnabled } from "util/featureToggle";
import InteractiveDeck from "components/ui/InteractiveDeck";

export default function Simple() {
  let buttonBg = useColorModeValue("gray.900", "gray.50");
  let buttonColor = useColorModeValue("white", "gray.900");

  return (
    <Container id="product-details-section" maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex>
          <InteractiveDeck></InteractiveDeck>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              Dichotomy card deck
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              Available for purchase soon!
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Which side are you on?
              </Text>
              <Text fontSize={"lg"}>
                Dichotomy is a thought-provoking card game designed to stimulate
                conversation and reflection. Each card presents two opposing
                concepts, and players must decide which one they align with
                most. Whether you're debating ocean vs. river, illusion vs.
                delusion, or art vs. science, Dichotomy encourages you to
                explore the nuances of your beliefs and preferences.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>1 deck of 76 unique cards</ListItem>
                  <ListItem>Packaged in tuck box</ListItem>{" "}
                  <ListItem>Guide sheet included</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          {isFeatureEnabled("canPurchase") && (
            <>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={buttonBg}
                color={buttonColor}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Add to cart
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>5-7 business days delivery</Text>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
