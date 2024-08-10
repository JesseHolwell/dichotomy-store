// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     emailjs
//       .send(
//         "service_ynfc32s",
//         "template_sx4gpsm",
//         {
//           user_name: formData.name,
//           user_email: formData.email,
//           message: formData.message,
//         },
//         process.env.REACT_APP_EMAILJS_PUBLICKEY
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           alert("Message sent successfully");
//         },
//         (error) => {
//           console.log(error.text);
//           alert("Failed to send message");
//         }
//       );

//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Message</label>
//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// export default Contact;

"use client";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";

export default function MailingList() {
  return (
    <Container
      id="contact-section"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
    >
      <Flex minW={{ sm: "50vw", xs: "100vw" }}>
        <Box
          bg={useColorModeValue("gray.100", "gray.900")}
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 10 }}
          w="full"
        >
          <Box p={4}>
            <Stack>
              <Box>
                <Heading>Stay in touch</Heading>
                <Text my={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                  Fill in the form to sign up to the mailing list
                </Text>
              </Box>
              <Box bg="#2c313d" borderRadius="lg">
                <Box m={8} color="white">
                  <VStack spacing={5}>
                    <FormControl id="name">
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="gray.900">
                        <InputLeftElement pointerEvents="none">
                          <BsPerson color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Email</FormLabel>
                      <InputGroup borderColor="gray.900">
                        <InputLeftElement pointerEvents="none">
                          <MdOutlineEmail color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name" float="right">
                      {/* <Button
                        variant="solid"
                        bg="#ff7700"
                        fontWeight={"normal"}
                        colorScheme="orange"
                        _hover={{ bg: "orange.500" }}
                      >
                        Sign up
                      </Button> */}

                      <Button
                        rounded={"full"}
                        size={"md"}
                        fontWeight={"normal"}
                        px={6}
                        mt={6}
                        colorScheme={"orange"}
                        bg={"orange.400"}
                        _hover={{ bg: "orange.500" }}
                      >
                        Sign up
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
