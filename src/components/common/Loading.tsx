import { Center, VStack, Spinner, Text } from '@chakra-ui/react';

export function Loading() {
   return (
      <Center minH="100vh">
         <VStack gap={6}>
            <Spinner
               width="80px"
               height="80px"
               color="accent"
               thickness="5px"
               speed="0.8s"
            />
            <Text
               fontSize="lg"
               color="gray.500"
               fontWeight="medium"
               letterSpacing="wide"
            >
               Loading...
            </Text>
         </VStack>
      </Center>
   );
}
