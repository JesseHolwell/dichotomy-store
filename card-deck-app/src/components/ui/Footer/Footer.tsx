"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/instagram";
import logo from "../assets/icon-transparent.png";

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10} mt={10} align={"center"}>
        <Stack align={"flex-start"}>
          <Flex
            as="a"
            href={"https://www.instagram.com/dichotomycards/"}
            target="_blank"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <HStack spacing={8} alignItems={"center"} h={"100%"} gap={"0"}>
              <SocialIcon
                // url=""
                network="instagram"
                bgColor="transparent"
              />
              <Text>@dichotomycards</Text>
            </HStack>
          </Flex>
        </Stack>
      </Container>
      <Box pb={10}>
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
          <Image
            src={logo}
            alt="Logo"
            fit={"cover"}
            align={"center"}
            height={16}
          />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © Copyright 2024
        </Text>
      </Box>
    </Box>
  );
}
