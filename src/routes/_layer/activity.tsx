import { createFileRoute } from '@tanstack/react-router';
import { Activity } from 'react';
import {
   Center,
   Box,
   Container,
   Heading,
   Text,
   VStack,
   SimpleGrid,
   Spinner
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useQuery } from '@tanstack/react-query';
import { orpc } from '@/orpc/client';
import { StravaActivityCard } from '@/components/StravaActivity';

export const Route = createFileRoute('/_layer/activity')({
   ssr: false,
   loader: ({ context: { queryClient } }) =>
      queryClient.prefetchQuery(orpc.strava.getActivities.queryOptions()),
   component: ActivityPage
});

function ActivityPage() {
   const headingColor = useColorModeValue('gray.800', 'white');

   const {
      data: activities,
      isLoading,
      error
   } = useQuery({
      ...orpc.strava.getActivities.queryOptions(),
      select: (s: any) => s.activities ?? []
   });

   if (error) {
      throw new Error(`Failed to load activities: ${error.message}`);
   }

   return (
      <Center>
         <VStack width="100%" mt={8} gap={'12'}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
               <VStack align="stretch" gap={12}>
                  <Box textAlign="left">
                     <Heading
                        as="h1"
                        fontSize={'5xl'}
                        fontWeight="extrabold"
                        color={headingColor}
                        mb={3}
                     >
                        My{' '}
                        <Box as="span" color={'accent'}>
                           Activities
                        </Box>
                     </Heading>

                     <Text
                        fontSize={'2xl'}
                        maxW="container.lg"
                        opacity={0.9}
                        letterSpacing="wide"
                     >
                        Hiking, climbing, running....
                     </Text>
                  </Box>

                  <Activity mode={isLoading ? 'hidden' : 'visible'}>
                     {activities &&
                     Array.isArray(activities) &&
                     activities.length > 0 ? (
                        <SimpleGrid
                           columns={{ base: 1, md: 2, xl: 3 }}
                           gap={{ base: 3, md: 4 }}
                           justifyItems="center"
                        >
                           {activities.map((activity: any) => (
                              <StravaActivityCard
                                 key={activity.id}
                                 activity={activity}
                              />
                           ))}
                        </SimpleGrid>
                     ) : (
                        <Box textAlign="center" py={12}>
                           <Text fontSize="lg" opacity={0.7}>
                              No activities found
                           </Text>
                        </Box>
                     )}
                  </Activity>

                  <Activity mode={isLoading ? 'visible' : 'hidden'}>
                     <Center py={12}>
                        <Spinner size="xl" color="accent" />
                     </Center>
                  </Activity>
               </VStack>
            </Container>
         </VStack>
      </Center>
   );
}
