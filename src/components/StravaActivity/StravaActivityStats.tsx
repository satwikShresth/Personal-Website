import { Activity } from 'react';
import { Flex, Stat, Text, VStack } from '@chakra-ui/react';
import { formatDuration, formatDistance, calculatePace } from '@/lib/activity';

interface StravaActivityStatsProps {
   duration?: number;
   distance?: number;
   averageHeartrate?: number;
   elevation?: number;
   sportType?: string;
   calories?: number;
   description?: string;
}

export function StravaActivityStats({
   duration,
   distance,
   averageHeartrate,
   elevation,
   sportType,
   calories,
   description
}: StravaActivityStatsProps) {
   const isRockClimbing = sportType?.toLowerCase() === 'rockclimbing';
   const durationData = formatDuration(duration);
   const parts = durationData.value.split(' ');
   const distanceData = formatDistance(distance);
   const elevationGain = elevation ? Math.round(elevation * 3.281) : null;

   // Rock Climbing special layout
   if (isRockClimbing) {
      return (
         <VStack align="stretch" gap={4} px={5} py={4} borderBottomRadius="2xl">
            <Flex wrap="wrap" gap={4} justify="space-between">
               {/* Time */}
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
                     Time
                  </Stat.Label>
               </Stat.Root>

               {/* Avg HR */}
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
                        Avg HR
                     </Stat.Label>
                  </Stat.Root>
               </Activity>

               {/* Calories */}
               <Activity mode={calories ? 'visible' : 'hidden'}>
                  <Stat.Root flex={1} minW="80px" textAlign="center">
                     <Stat.ValueText
                        fontSize="2xl"
                        fontWeight="bold"
                        color="gray.900"
                        _dark={{ color: 'white' }}
                     >
                        {calories || 0}
                        <Stat.ValueUnit fontSize="sm" ml={1}>
                           Cal
                        </Stat.ValueUnit>
                     </Stat.ValueText>
                     <Stat.Label
                        fontSize="xs"
                        fontWeight="medium"
                        color="accent"
                        textTransform="uppercase"
                        letterSpacing="wide"
                     >
                        Calories
                     </Stat.Label>
                  </Stat.Root>
               </Activity>
            </Flex>

            {/* Description/Comments */}
            <Activity mode={description ? 'visible' : 'hidden'}>
               <VStack align="start" gap={1}>
                  <Text
                     fontSize="xs"
                     fontWeight="medium"
                     color="accent"
                     textTransform="uppercase"
                     letterSpacing="wide"
                  >
                     Details
                  </Text>
                  <Text
                     fontSize="sm"
                     color="gray.700"
                     _dark={{ color: 'gray.300' }}
                     lineHeight="1.6"
                  >
                     {description}
                  </Text>
               </VStack>
            </Activity>
         </VStack>
      );
   }

   // Default layout for other activities

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
