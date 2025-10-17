import { createFileRoute } from '@tanstack/react-router';
import { Activity } from 'react';
import * as React from 'react';
import { z } from 'zod';
import {
   Center,
   Box,
   Container,
   Heading,
   Text,
   VStack,
   SimpleGrid,
   Spinner,
   Button
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useInfiniteQuery } from '@tanstack/react-query';
import { orpc } from '@/orpc/client';
import { StravaActivityCard, StravaActivityHeatMap } from '@/components/StravaActivity';

const activitySearchSchema = z.object({
   year: z.number().min(2000).max(2100).catch(new Date().getFullYear())
});

export const Route = createFileRoute('/_layer/activity')({
   ssr: false,
   validateSearch: activitySearchSchema,
   component: ActivityPage
});

function ActivityPage() {
   const headingColor = useColorModeValue('gray.800', 'white');
   const year = Route.useSearch({ select: (s) => s.year });
   const loadMoreRef = React.useRef<HTMLDivElement>(null);

   const {
      data,
      isLoading,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage
   } = useInfiniteQuery(
      orpc.strava.getActivities.infiniteOptions({
         input: (pageParam: number | undefined) => ({
            page: pageParam ?? 1,
            perPage: 20,
            ...(year && { year })
         }),
         context: { cache: true },
         initialPageParam: 1,
         getNextPageParam: (lastPage) => {
            const hasMore = lastPage.count === lastPage.perPage;
            return hasMore ? lastPage.page + 1 : undefined;
         },
         staleTime: 1000 * 60 * 5 // 5 minutes
      })
   );

   // Flatten all pages into a single array of activities
   const activities = React.useMemo(
      () => data?.pages.flatMap((page: any) => page.activities) ?? [],
      [data]
   );

   // Intersection observer for infinite scroll
   React.useEffect(() => {
      if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

      const observer = new IntersectionObserver(
         entries => {
            if (entries[0].isIntersecting) {
               fetchNextPage();
            }
         },
         { threshold: 0.1 }
      );

      observer.observe(loadMoreRef.current);

      return () => observer.disconnect();
   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

                  {/* Year Heatmap */}
                  <Box>
                     <StravaActivityHeatMap year={year} />
                  </Box>

                  <Activity mode={isLoading ? 'hidden' : 'visible'}>
                     {activities && activities.length > 0 ? (
                        <VStack align="stretch" gap={6}>
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

                           {/* Intersection observer trigger & Load More Button */}
                           {hasNextPage && (
                              <Box ref={loadMoreRef} py={8}>
                                 <Center>
                                    {isFetchingNextPage ? (
                                       <Spinner size="lg" color="accent" />
                                    ) : (
                                       <Button
                                          onClick={() => fetchNextPage()}
                                          variant="outline"
                                          size="lg"
                                       >
                                          Load More Activities
                                       </Button>
                                    )}
                                 </Center>
                              </Box>
                           )}
                        </VStack>
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
