import { useEffect, useState } from 'react';
import {
   MapContainer,
   TileLayer,
   Polyline,
   CircleMarker,
   useMap
} from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import { decodePolyline } from '@/lib/polyline-decoder';
import type { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface StravaActivityMapViewProps {
   polyline?: string;
}

// Component to fit map bounds to polyline
function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
   const map = useMap();

   useEffect(() => {
      if (bounds) {
         map.fitBounds(bounds, { padding: [20, 20] });
      }
   }, [bounds, map]);

   return null;
}

export function StravaActivityMapView({
   polyline
}: StravaActivityMapViewProps) {
   const [coordinates, setCoordinates] = useState<[number, number][]>([]);
   const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);

   useEffect(() => {
      if (polyline) {
         try {
            const decoded = decodePolyline(polyline);
            if (decoded.length > 0) {
               setCoordinates(decoded);

               // Calculate bounds
               const lats = decoded.map(coord => coord[0]);
               const lngs = decoded.map(coord => coord[1]);
               const minLat = Math.min(...lats);
               const maxLat = Math.max(...lats);
               const minLng = Math.min(...lngs);
               const maxLng = Math.max(...lngs);
               setBounds([
                  [minLat, minLng],
                  [maxLat, maxLng]
               ]);
            }
         } catch (error) {
            console.error('Failed to decode polyline:', error);
         }
      }
   }, [polyline]);

   if (coordinates.length === 0) {
      return null;
   }

   const defaultCenter: [number, number] = coordinates[0] || [0, 0];
   const startPoint = coordinates[0];
   const endPoint = coordinates[coordinates.length - 1];

   return (
      <Box
         height="200px"
         width="calc(100% - 20px)"
         mx="auto"
         position="relative"
         bg="gray.50"
         _dark={{ bg: 'gray.900' }}
         borderRadius="xl"
         overflow="hidden"
         shadow="inner"
         flexShrink={0}
         css={{
            '& .leaflet-container': {
               height: '100%',
               width: '100%',
               zIndex: 0,
               background: '#f5f5f0',
               borderRadius: '0.75rem'
            },
            '& .leaflet-control-attribution': {
               display: 'none'
            },
            '& .leaflet-control-zoom': {
               display: 'none'
            },
            '& .map-tiles': {
               filter: 'brightness(0.92) contrast(1.05) saturate(0.95)'
            }
         }}
      >
         <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
            zoomControl={false}
            dragging={false}
            doubleClickZoom={false}
            touchZoom={false}
            attributionControl={false}
         >
            <TileLayer
               url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
               maxZoom={19}
               className="map-tiles"
            />

            {/* Shadow layer for depth */}
            <Polyline
               positions={coordinates}
               pathOptions={{
                  color: '#000000',
                  weight: 6,
                  opacity: 0.2,
                  lineCap: 'round',
                  lineJoin: 'round'
               }}
            />

            {/* Main route - vibrant accent color */}
            <Polyline
               positions={coordinates}
               pathOptions={{
                  color: '#fc4c02',
                  weight: 4,
                  opacity: 1,
                  lineCap: 'round',
                  lineJoin: 'round'
               }}
            />

            {/* Start marker - Green with subtle shadow */}
            {startPoint && (
               <CircleMarker
                  center={startPoint}
                  radius={9}
                  pathOptions={{
                     fillColor: '#10b981',
                     fillOpacity: 1,
                     color: '#ffffff',
                     weight: 3,
                     opacity: 1
                  }}
               />
            )}

            {/* End marker - Red with subtle shadow */}
            {endPoint && (
               <CircleMarker
                  center={endPoint}
                  radius={9}
                  pathOptions={{
                     fillColor: '#ef4444',
                     fillOpacity: 1,
                     color: '#ffffff',
                     weight: 3,
                     opacity: 1
                  }}
               />
            )}

            <FitBounds bounds={bounds} />
         </MapContainer>
      </Box>
   );
}
