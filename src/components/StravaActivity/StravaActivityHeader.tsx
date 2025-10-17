import { Box, HStack, VStack, Text, Link } from '@chakra-ui/react';
import { getActivityIcon, formatActivityDate } from '@/lib/activity';

interface StravaActivityHeaderProps {
   name?: string;
   type?: string;
   sportType?: string;
   startDate?: string;
   athleteId?: number;
}

export function StravaActivityHeader({
   name,
   type,
   sportType,
   startDate,
   athleteId
}: StravaActivityHeaderProps) {
   const stravaUrl = athleteId
      ? `https://strava.com/athletes/${athleteId}`
      : 'https://strava.com';

   return (
      <Box
         p={5}
         pb={4}
         overflow="hidden"
         borderTopRadius="2xl"
         position="relative"
      >
         {/* Strava Badge - Top Right */}
         <Link
            href={stravaUrl}
            target="_blank"
            rel="noopener noreferrer"
            position="absolute"
            top={3}
            right={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="28px"
            width="auto"
            zIndex={1}
            transition="all 0.2s"
            opacity={0.8}
            _hover={{
               opacity: 1,
               transform: 'scale(1.05)'
            }}
            aria-label="View on Strava"
         >
            <img
               src="/strava.svg"
               alt="Strava"
               style={{ height: '28px', width: 'auto' }}
            />
         </Link>

         <HStack gap={3} mb={3} align="center" flexWrap="nowrap" pr={8}>
            <Box
               color="white"
               p={2.5}
               display="flex"
               alignItems="center"
               justifyContent="center"
               flexShrink={0}
            >
               {getActivityIcon(type, sportType, 'white')}
            </Box>
            <VStack align="start" gap={0.5} flex={1} minW={0}>
               <Text
                  color='accent'
                  fontSize="lg"
                  fontWeight="bold"
                  lineHeight="1.2"
                  truncate
                  letterSpacing="tight"
                  maxW="100%"
               >
                  {name}
               </Text>
               <Text
                  fontSize="xs"
                  fontWeight="medium"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxW="100%"
               >
                  {formatActivityDate(startDate)}
               </Text>
            </VStack>
         </HStack>
      </Box>
   );
}
