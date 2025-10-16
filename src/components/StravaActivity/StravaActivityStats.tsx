import { Flex, Stat } from '@chakra-ui/react'
import { formatDuration, formatDistance, calculatePace } from '@/lib/activity'

interface StravaActivityStatsProps {
  duration?: number
  distance?: number
  averageHeartrate?: number
}

export function StravaActivityStats({ duration, distance, averageHeartrate }: StravaActivityStatsProps) {
  const durationData = formatDuration(duration)
  const parts = durationData.value.split(' ')
  const distanceData = formatDistance(distance)

  return (
    <Flex
      wrap="wrap"
      px={5}
      py={4}
      gap={4}
      borderTop="1px solid"
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
          lineHeight="1"
        >
          {parts[0]}
          <Stat.ValueUnit fontSize="sm" ml={0.5}>
            {durationData.units[0]}
          </Stat.ValueUnit>
          {parts[1] && (
            <>
              {' '}{parts[1]}
              <Stat.ValueUnit fontSize="sm" ml={0.5}>
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
          mt={1.5}
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
          lineHeight="1"
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
          mt={1.5}
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
          lineHeight="1"
        >
          {calculatePace(distance, duration)}
          <Stat.ValueUnit fontSize="sm" ml={1}>
            /mi
          </Stat.ValueUnit>
        </Stat.ValueText>
        <Stat.Label
          fontSize="xs"
          color="accent"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="wide"
          mt={1.5}
        >
          Pace
        </Stat.Label>
      </Stat.Root>

      {averageHeartrate && (
        <Stat.Root flex={1} minW="80px" textAlign="center">
          <Stat.ValueText
            fontSize="2xl"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: 'white' }}
            lineHeight="1"
          >
            {Math.round(averageHeartrate)}
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
            mt={1.5}
          >
            Heart Rate
          </Stat.Label>
        </Stat.Root>
      )}
    </Flex>
  )
}

