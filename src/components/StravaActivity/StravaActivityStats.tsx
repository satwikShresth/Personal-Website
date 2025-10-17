import { Activity } from 'react';
import { Flex, Stat } from '@chakra-ui/react';
import { formatDuration, formatDistance, calculatePace } from '@/lib/activity';

interface StravaActivityStatsProps {
   duration?: number;
   distance?: number;
   averageHeartrate?: number;
   elevation?: number;
}

export function StravaActivityStats({
   duration,
   distance,
   averageHeartrate,
   elevation
}: StravaActivityStatsProps) {
   const durationData = formatDuration(duration);
   const parts = durationData.value.split(' ');
   const distanceData = formatDistance(distance);
   const elevationGain = elevation ? Math.round(elevation * 3.281) : null;

   return (
      <Flex
         wrap="wrap"
         px={5}
         py={4}
         gap={4}
         borderColor="gray.100"
         _dark={{ borderColor: 'gray.800' }}
         borderBottomRadius="2xl"
         justify="space-between"
      >
         <Stat.Root flex={1} minW="80px" textAlign="center">
            <Stat.ValueText
               fontSize="2xl"
               fontWeight="bold"
               color="gray.900"
               _dark={{ color: 'white' }}
            >
               {parts[0]}
               <Stat.ValueUnit fontSize="sm">
                  {durationData.units[0]}
               </Stat.ValueUnit>
               {parts[1] && (
                  <>
                     {' '}
                     {parts[1]}
                     <Stat.ValueUnit fontSize="sm">
                        {durationData.units[1]}
                     </Stat.ValueUnit>
                  </>
               )}
            </Stat.ValueText>
            <Stat.Label
               fontSize="xs"
               color="accent"
               fontWeight="medium"
               textTransform="uppercase"
               letterSpacing="wide"
            >
               Duration
            </Stat.Label>
         </Stat.Root>

         <Stat.Root flex={1} minW="80px" textAlign="center">
            <Stat.ValueText
               fontSize="2xl"
               fontWeight="bold"
               color="gray.900"
               _dark={{ color: 'white' }}
            >
               {distanceData.value}
               <Stat.ValueUnit fontSize="sm" ml={1}>
                  {distanceData.unit}
               </Stat.ValueUnit>
            </Stat.ValueText>
            <Stat.Label
               fontSize="xs"
               color="accent"
               fontWeight="medium"
               textTransform="uppercase"
               letterSpacing="wide"
            >
               Distance
            </Stat.Label>
         </Stat.Root>

         <Stat.Root flex={1} minW="80px" textAlign="center">
            <Stat.ValueText
               fontSize="2xl"
               fontWeight="bold"
               color="gray.900"
               _dark={{ color: 'white' }}
            >
               {calculatePace(distance, duration)}
               <Stat.ValueUnit fontSize="sm" ml={1}>
                  per mile
               </Stat.ValueUnit>
            </Stat.ValueText>
            <Stat.Label
               fontSize="xs"
               color="accent"
               fontWeight="medium"
               textTransform="uppercase"
               letterSpacing="wide"
            >
               Pace
            </Stat.Label>
         </Stat.Root>

         <Activity mode={elevationGain ? 'visible' : 'hidden'}>
            <Stat.Root flex={1} minW="80px" textAlign="center">
               <Stat.ValueText
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.900"
                  _dark={{ color: 'white' }}
               >
                  {elevationGain || 0}
                  <Stat.ValueUnit fontSize="sm" ml={1}>
                     ft
                  </Stat.ValueUnit>
               </Stat.ValueText>
               <Stat.Label
                  fontSize="xs"
                  fontWeight="medium"
                  color="accent"
                  textTransform="uppercase"
                  letterSpacing="wide"
               >
                  ELEV GAIN
               </Stat.Label>
            </Stat.Root>
         </Activity>

         <Activity mode={averageHeartrate ? 'visible' : 'hidden'}>
            <Stat.Root flex={1} minW="80px" textAlign="center">
               <Stat.ValueText
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.900"
                  _dark={{ color: 'white' }}
               >
                  {averageHeartrate ? Math.round(averageHeartrate) : 0}
                  <Stat.ValueUnit fontSize="sm" ml={1}>
                     bpm
                  </Stat.ValueUnit>
               </Stat.ValueText>
               <Stat.Label
                  fontSize="xs"
                  fontWeight="medium"
                  color="accent"
                  textTransform="uppercase"
                  letterSpacing="wide"
               >
                  AVG HR
               </Stat.Label>
            </Stat.Root>
         </Activity>
      </Flex>
   );
}
