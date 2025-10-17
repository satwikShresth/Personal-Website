import { VStack } from '@chakra-ui/react';
import { StravaActivityHeader } from './StravaActivityHeader';
import { StravaActivityMapView } from './StravaActivityMapView';
import { StravaActivityStats } from './StravaActivityStats';

interface StravaActivityCardProps {
   activity: any;
}

export function StravaActivityCard({ activity }: StravaActivityCardProps) {
   return (
      <VStack
         borderRadius="2xl"
         overflow="visible"
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

         <StravaActivityMapView polyline={activity.map?.summaryPolyline} />

         <StravaActivityStats
            duration={activity.movingTime}
            distance={activity.distance}
            elevation={activity.totalElevationGain}
            averageHeartrate={activity.averageHeartrate}
         />
      </VStack>
   );
}
