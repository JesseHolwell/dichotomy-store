"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import CardFront from "../assets/sample-card-front.jpg";
import { isFeatureEnabled } from "../util/featureToggle";
import CardDeck from "./CardDeck";
import HandwrittenLabel from "./AnnotationArrow";
import CallToActionWithAnnotation from "./AnnotationArrow";
import AnnotationArrow from "./AnnotationArrow";
import InteractiveDeck from "./InteractiveDeck";

export default function Simple() {
  let buttonBg = useColorModeValue("gray.900", "gray.50");
  let buttonColor = useColorModeValue("white", "gray.900");

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          {/* <Image
            // rounded={"md"}
            rounded={"2xl"}
            alt={"product image"}
            src={
              CardFront
              //   "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
            }
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          /> */}

          {/* <CardDeck></CardDeck> */}
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
              Coming Soon!
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
                Algunas palabras
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
                <List spacing={2}>
                  <ListItem>...</ListItem>
                  <ListItem>...</ListItem>
                  <ListItem>...</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            {/* <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    lorem ipsum
                  </Text>{" "}
                  lorem ipsum
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    lorem ipsum
                  </Text>{" "}
                  lorem ipsum
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Bracelet:
                  </Text>{" "}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case:
                  </Text>{" "}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case diameter:
                  </Text>{" "}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Crystal:
                  </Text>{" "}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Water resistance:
                  </Text>{" "}
                  5 bar (50 metres / 167 feet){" "}
                </ListItem>
              </List>
            </Box> */}
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
      </SimpleGrid>
    </Container>
  );
}
