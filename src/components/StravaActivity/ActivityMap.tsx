import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import { decodePolyline } from '@/lib/polyline-decoder'
import { Box } from '@chakra-ui/react'
import 'leaflet/dist/leaflet.css'
import type { LatLngBoundsExpression } from 'leaflet'

interface Activity {
  id: number
  name: string
  map?: {
    summary_polyline?: string
  }
}

interface ActivityMapProps {
  activities: Activity[]
}

// Component to fit map bounds to all polylines
function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [bounds, map])
  
  return null
}

export function ActivityMap({ activities }: ActivityMapProps) {
  const [polylines, setPolylines] = useState<Array<{ id: number; coordinates: [number, number][]; color: string }>>([])
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null)

  useEffect(() => {
    const colors = ['#FC4C02', '#2196F3', '#4CAF50', '#FF9800', '#9C27B0']
    const decoded: Array<{ id: number; coordinates: [number, number][]; color: string }> = []
    let allCoordinates: [number, number][] = []

    activities.forEach((activity, index) => {
      if (activity.map?.summary_polyline) {
        try {
          const coordinates = decodePolyline(activity.map.summary_polyline)
          if (coordinates.length > 0) {
            decoded.push({
              id: activity.id,
              coordinates,
              color: colors[index % colors.length],
            })
            allCoordinates = [...allCoordinates, ...coordinates]
          }
        } catch (error) {
          console.error(`Failed to decode polyline for activity ${activity.id}:`, error)
        }
      }
    })

    setPolylines(decoded)

    // Calculate bounds from all coordinates
    if (allCoordinates.length > 0) {
      const lats = allCoordinates.map(coord => coord[0])
      const lngs = allCoordinates.map(coord => coord[1])
      const minLat = Math.min(...lats)
      const maxLat = Math.max(...lats)
      const minLng = Math.min(...lngs)
      const maxLng = Math.max(...lngs)
      setBounds([[minLat, minLng], [maxLat, maxLng]])
    }
  }, [activities])

  if (polylines.length === 0) {
    return null
  }

  // Use the first coordinate as the default center
  const defaultCenter: [number, number] = polylines[0]?.coordinates[0] || [0, 0]

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      height="500px"
      width="100%"
      position="relative"
      sx={{
        '& .leaflet-container': {
          height: '100%',
          width: '100%',
          zIndex: 0,
        },
      }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
          attribution='Map &copy; <a href="https://memomaps.de/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        />
        
        {polylines.map((polyline) => (
          <Polyline
            key={polyline.id}
            positions={polyline.coordinates}
            pathOptions={{
              color: polyline.color,
              weight: 3,
              opacity: 0.8,
            }}
          />
        ))}

        <FitBounds bounds={bounds} />
      </MapContainer>
    </Box>
  )
}

