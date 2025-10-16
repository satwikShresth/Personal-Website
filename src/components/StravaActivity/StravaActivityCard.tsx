import { VStack } from '@chakra-ui/react'
import type { SummaryActivity } from '@/strava-client/sdk'
import { StravaActivityHeader } from './StravaActivityHeader'
import { StravaActivityMapView } from './StravaActivityMapView'
import { StravaActivityStats } from './StravaActivityStats'

interface StravaActivityCardProps {
  activity: SummaryActivity
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
        transform: 'translateY(-2px)',
        shadow: '2xl',
      }}
      cursor="pointer"
      shadow="md"
      border="1px solid"
      borderColor="gray.100"
    >
      <StravaActivityHeader
        name={activity.name}
        type={activity.type}
        sportType={activity.sport_type}
        startDate={activity.start_date_local}
        athleteId={activity.athlete?.id}
      />

      <StravaActivityMapView polyline={activity.map?.summary_polyline} />

      <StravaActivityStats
        duration={activity.moving_time}
        distance={activity.distance}
        averageHeartrate={(activity as any)?.average_heartrate}
      />
    </VStack>
  )
}

