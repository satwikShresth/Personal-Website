import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import { getActivityIcon, formatActivityDate } from '@/lib/activity'

interface StravaActivityHeaderProps {
  name?: string
  type?: string
  sportType?: string
  startDate?: string
}

export function StravaActivityHeader({ name, type, sportType, startDate }: StravaActivityHeaderProps) {
  return (
    <Box p={5} pb={4} overflow="hidden" borderTopRadius="2xl">
      <HStack gap={3} mb={3} align="center" flexWrap="nowrap">
        <Box
          color="white"
          p={2.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          {getActivityIcon(type, sportType)}
        </Box>
        <VStack align="start" gap={0.5} flex={1} minW={0}>
          <Text
            _dark={{ color: 'white' }}
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
  )
}

