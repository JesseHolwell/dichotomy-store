import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  email: string;
  name: string;
};

const MailingList: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const emailValue = watch("email");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://api.sendinblue.com/v3/contacts",
        {
          email: data.email,
          attributes: {
            FIRSTNAME: data.name,
          },
          listIds: [process.env.REACT_APP_BREVO_LIST_ID_STAGING],
          updateEnabled: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.REACT_APP_BREVO_API_KEY,
          },
        }
      );
      setSubmitStatus("Successfully subscribed! Thank you.");
      reset();
    } catch (error: any) {
      // console.log(error);
      setSubmitStatus(
        "There was an error subscribing.\n" + error.response.data.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // // Reset submit status when email changes
  // React.useEffect(() => {
  //   if (submitStatus && emailValue) {
  //     setSubmitStatus(null);
  //   }
  // }, [emailValue, submitStatus]);

  return (
    <Container
      id="contact-section"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
    >
      <Flex
        minW={{ sm: "50vw", xs: "100vw" }}
        maxW={{ sm: "50vw", xs: "100vw" }}
      >
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={5}>
                      <FormControl id="name" isInvalid={!!errors.name}>
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="gray.900">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                        </InputGroup>
                        {errors.name && (
                          <Text color="red.500">{errors.name.message}</Text>
                        )}
                      </FormControl>
                      <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="gray.900">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            size="md"
                            {...register("email", {
                              required: "Email is required",
                            })}
                          />
                        </InputGroup>
                        {errors.email && (
                          <Text color="red.500">{errors.email.message}</Text>
                        )}
                      </FormControl>
                      <FormControl id="submit">
                        <Button
                          rounded={"full"}
                          size={"md"}
                          fontWeight={"normal"}
                          px={6}
                          mt={6}
                          colorScheme={"orange"}
                          bg={"orange.400"}
                          _hover={{ bg: "orange.500" }}
                          type="submit"
                          isDisabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Sign up"}
                        </Button>
                        {submitStatus && (
                          <Text
                            mt={3}
                            color={
                              submitStatus.startsWith("Successfully")
                                ? "green.500"
                                : "red.500"
                            }
                          >
                            {submitStatus}
                          </Text>
                        )}
                      </FormControl>
                    </VStack>
                  </form>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default MailingList;
