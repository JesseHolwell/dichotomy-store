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
import CardFront from "../assets/sample-card-front-blank.jpg";
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
          src={CardFront}
          fit={"contain"}
          align={"center"}
          w={"100%"}
        />
        <HStack
          position="absolute"
          top={"50%"}
          left="50%"
          transform={"translate(-50%, -50%)"}
          textShadow="#000 0 0 4px;"
          textTransform="uppercase"
          color="#EEE"
          fontWeight="bold"
          fontSize={"1.7em"}
          width="100%"
        >
          <Text as="span" display="block" w="full" textAlign={"center"}>
            {currentPair.word1}
          </Text>
          <Text as="span" display="block" w="full" textAlign={"center"}>
            {currentPair.word2}
          </Text>
        </HStack>
      </Box>
      <Box ml="70%">
        <AnnotationArrow></AnnotationArrow>
      </Box>
    </Box>
  );
};

export default CardComponent;
