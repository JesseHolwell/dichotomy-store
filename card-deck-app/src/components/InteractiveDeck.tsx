"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import CardRear from "../assets/sample-card-rear.jpg";
import CardFront from "../assets/sample-card-front.jpg";
import AnnotationArrow from "./AnnotationArrow";
import { useState } from "react";

interface WordPair {
  word1: string;
  word2: string;
}

const wordPairs: WordPair[] = [
  { word1: "Introvert", word2: "Extrovert" },
  { word1: "Optimist", word2: "Pessimist" },
  { word1: "Thinker", word2: "Feeler" },
  { word1: "Planner", word2: "Spontaneous" },
  { word1: "Confident", word2: "Shy" },
];

function getRandomPair(exclude: WordPair | null): WordPair {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * wordPairs.length);
  } while (wordPairs[randomIndex] === exclude);
  return wordPairs[randomIndex];
}

const CardComponent: React.FC = () => {
  const [currentPair, setCurrentPair] = useState<WordPair>(() =>
    getRandomPair(null)
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = () => {
    // showAnnotationArrow = false;
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPair(getRandomPair(currentPair));
        setIsAnimating(false);
      }, 500); // Match the duration of the animation
    }
  };

  return (
    <Box w="full">
      <Box onClick={handleCardClick} position="relative" cursor={"pointer"}>
        <Image
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
          //   h={{ base: "100%", sm: "400px", lg: "500px" }}
        />
        <HStack
          position="absolute"
          top={"50%"}
          left="50%"
          transform={"translate(-50%, -50%)"}
          //   alignContent={"center"}
          //   justifyContent={"space-evenly"}
          textShadow="#000 0 0 4px;"
          textTransform="uppercase"
          color="#EEE"
          fontWeight="bold"
          fontSize={"1.7em"}
          width="100%"
          // display="flex"
          // justifyContent={"space-between"}
          // px="10%"
          // justifyContent={"space-evenly"}
        >
          {/* <Heading size="md" textAlign="center"> */}
          <Text as="span" display="block" w="full" textAlign={"center"}>
            {currentPair.word1}
          </Text>
          <Text as="span" display="block" w="full" textAlign={"center"}>
            {currentPair.word2}
          </Text>
          {/* </Heading> */}
        </HStack>
      </Box>
      <Box ml="50%">
        <AnnotationArrow></AnnotationArrow>
      </Box>
    </Box>
  );
};

// export default InteractiveDeck;
export default CardComponent;
