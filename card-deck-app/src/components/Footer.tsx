"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Image,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import logo from "../assets/icon.png";
import { SocialIcon } from "react-social-icons";
// import { Mdinsta } from "react-icons/md";
// import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";

// NOTE: could use MdInstagram instead

// const Logo = (props: any) => {
//   return (

//     // <svg
//     //   height={32}
//     //   viewBox="0 0 120 28"
//     //   xmlns="http://www.w3.org/2000/svg"
//     //   {...props}
//     // >

//     // </svg>
//   );
// };

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10} mt={10} align={"center"}>
        {/* <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}> */}
        {/* <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"#"}>
              Overview
            </Box>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Box as="a" href={"#"}>
                Features
              </Box>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack>
            <Box as="a" href={"#"}>
              Tutorials
            </Box>
            <Box as="a" href={"#"}>
              Pricing
            </Box>
            <Box as="a" href={"#"}>
              Releases
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"#"}>
              About Us
            </Box>
            <Box as="a" href={"#"}>
              Press
            </Box>
            <Box as="a" href={"#"}>
              Careers
            </Box>
            <Box as="a" href={"#"}>
              Contact Us
            </Box>
            <Box as="a" href={"#"}>
              Partners
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"#"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
            <Box as="a" href={"#"}>
              Law Enforcement
            </Box>
            <Box as="a" href={"#"}>
              Status
            </Box>
          </Stack> */}
        <Stack align={"flex-start"}>
          {/* <ListHeader>Follow Us</ListHeader> */}

          <Flex
            as="a"
            href={"https://www.instagram.com/dichotomycards/"}
            target="_blank"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <HStack spacing={8} alignItems={"center"} h={"100%"} gap={"2"}>
              <SocialIcon
                // url=""
                network="instagram"
                bgColor="333333"
              />
              <Text>@dichotomycards</Text>
            </HStack>
          </Flex>
          {/* <Box as="a" href={"#"}>
              Twitter
            </Box>
            <Box as="a" href={"#"}>
              Dribbble
            </Box>
            <Box as="a" href={"#"}>
              Instagram
            </Box>
            <Box as="a" href={"#"}>
              LinkedIn
            </Box> */}
        </Stack>
        {/* </SimpleGrid> */}
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          {/* <Logo /> */}
          <Image
            src={logo}
            alt="Logo"
            // display={{ height: "100%" }}
            fit={"cover"}
            align={"center"}
            height={16}
          />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2024 Something legal something
        </Text>
      </Box>
    </Box>
  );
}
