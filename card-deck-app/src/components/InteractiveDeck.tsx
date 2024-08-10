"use client";

import { Box, Image, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CardFront from "../assets/sample-card-front-blank.jpg";
import AnnotationArrow from "./AnnotationArrow";
import "./InteractiveDeck.css";

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

// function getRandomPair(exclude: WordPair | null): WordPair {
//   let randomIndex;
//   do {
//     randomIndex = Math.floor(Math.random() * wordPairs.length);
//   } while (wordPairs[randomIndex] === exclude);
//   return wordPairs[randomIndex];
// }
const CardComponent: React.FC = () => {
  const [stack, setStack] = useState<WordPair[]>([wordPairs[0], wordPairs[1]]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);

      // Calculate the next index
      const nextIndex = (currentIndex + 1) % wordPairs.length;

      // Immediately update the stack so the bottom card is set to the next pair in the list
      setStack((prevStack) => [
        prevStack[0], // Keep the current top card
        wordPairs[nextIndex], // Set the bottom card to the next pair in the list
      ]);

      // After the animation completes, shift the new bottom card to the top
      setTimeout(() => {
        setStack((prevStack) => [
          prevStack[1], // Move the bottom card to the top
          wordPairs[nextIndex], // Keep the next pair in the bottom
        ]);
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }, 500); // Match the duration of the animation
    }
  };

  return (
    <Box w="full">
      <Box w="full" position="relative">
        {/* Hack to properly size the card deck based on this image.. TODO: fix */}
        <Image
          display={"hidden"}
          rounded={"2xl"}
          alt={"product image"}
          src={CardFront}
          fit={"contain"}
          align={"center"}
          w={"100%"}
        />

        {/* Render the cards, the top one being the one that animates */}
        {stack.slice(0, 2).map((pair, index) => (
          <Box
            key={index}
            onClick={index === 0 ? handleCardClick : undefined}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            cursor={index === 0 ? "pointer" : "default"}
            animation={
              index === 0 && isAnimating
                ? "removeCard 0.5s ease forwards"
                : "none"
            }
            zIndex={index === 0 ? 1 : 0}
          >
            <Image
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
                {pair.word1}
              </Text>
              <Text as="span" display="block" w="full" textAlign={"center"}>
                {pair.word2}
              </Text>
            </HStack>
          </Box>
        ))}
      </Box>
      <Box ml="70%">
        <AnnotationArrow />
      </Box>
    </Box>
  );
};

export default CardComponent;
