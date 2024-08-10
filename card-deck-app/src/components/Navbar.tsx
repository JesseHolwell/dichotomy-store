"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Image,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import { isFeatureEnabled } from "../util/featureToggle";

interface Props {
  children: React.ReactNode;
}

const Links = [
  {
    label: "Home",
    value: "",
    enabled: true,
  },
  {
    label: "Buy",
    value: "Buy",
    enabled: isFeatureEnabled("canPurchase"),
  },
  {
    label: "Contact",
    value: "Contact",
    enabled: true,
  },
];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} h={"100%"}>
            {/* <Box boxSize="sm"> */}
            <Image
              src={logo}
              alt="Logo"
              // display={{ height: "100%" }}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
            />
            {/* </Box> */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) =>
                // <NavLink key={link}>{link}</NavLink>
                link.enabled ? (
                  <Link to={"/" + link.value}>{link.label}</Link>
                ) : (
                  ""
                )
              )}
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) =>
                link.enabled ? (
                  <NavLink key={link.value}>{link.label}</NavLink>
                ) : (
                  ""
                )
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
