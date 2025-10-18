import { VStack, Image, Box } from '@chakra-ui/react';
import { StravaActivityHeader } from './StravaActivityHeader';
import { StravaActivityMapView } from './StravaActivityMapView';
import { StravaActivityStats } from './StravaActivityStats';
import { Activity } from 'react';

interface StravaActivityCardProps {
   activity: any;
}

export function StravaActivityCard({ activity }: StravaActivityCardProps) {
   const hasPhoto = activity.photos?.primary?.urls?.['600'];
   const hasMap = activity.map?.summaryPolyline;

   return (
      <VStack
         borderRadius="2xl"
         overflow="hidden"
         width="100%"
         maxW="500px"
         minH="fit-content"
         mx="auto"
         bg="white"
         _dark={{ bg: 'gray.950', borderColor: 'gray.800' }}
         gap={0}
         align="stretch"
         transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
         _hover={{
            borderColor: 'accent'
         }}
         cursor="pointer"
         shadow="md"
         border="1px solid"
         borderColor="gray.100"
      >
         <StravaActivityHeader
            name={activity.name}
            type={activity.type}
            sportType={activity.sportType}
            startDate={activity.startDateLocal}
            athleteId={activity.athleteId}
         />

         {/* Photo (prioritize over map if both exist) */}
         <Activity mode={hasPhoto ? 'visible' : 'hidden'}>
            <Box
               position="relative"
               width="100%"
               aspectRatio={4 / 3}
               overflow="hidden"
            >
               <Image
                  src={hasPhoto}
                  alt={activity.name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  loading="lazy"
               />
            </Box>
         </Activity>

         {/* Map (show only if no photo) */}
         <Activity mode={!hasPhoto && hasMap ? 'visible' : 'hidden'}>
            <StravaActivityMapView polyline={activity.map?.summaryPolyline} />
         </Activity>

         <StravaActivityStats
            duration={activity.movingTime}
            distance={activity.distance}
            elevation={activity.totalElevationGain}
            averageHeartrate={activity.averageHeartrate}
            sportType={activity.sportType}
            calories={activity.calories}
            description={activity.description}
            kudosCount={activity.kudosCount}
         />
      </VStack>
   );
}
