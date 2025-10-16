# Activity Utilities

A collection of utility functions for working with activity data (Strava activities, fitness tracking, etc.).

## Installation

```typescript
import { formatDuration, calculatePace, getActivityIcon } from '@/lib/activity'
```

## Modules

### Time Utilities (`time-utils.ts`)

Functions for formatting time, duration, and relative dates.

#### `formatDuration(seconds?: number)`
Converts seconds to human-readable duration format.

```typescript
formatDuration(3661) // { value: "1 1", units: ["h", "m"] }
formatDuration(125)  // { value: "2 5", units: ["m", "s"] }
```

#### `getRelativeTime(dateString?: string)`
Returns relative time string from an ISO date.

```typescript
getRelativeTime("2024-01-15T14:30:00Z") // "2 days 3hr ago"
```

#### `formatActivityDate(dateString?: string)`
Formats date to "Day at Time [relative]" format.

```typescript
formatActivityDate("2024-01-15T14:30:00Z") 
// "Monday at 2:30 PM [2 days 3hr ago]"
```

---

### Distance Utilities (`distance-utils.ts`)

Functions for distance conversion and pace calculation.

#### `formatDistance(meters?: number)`
Converts meters to miles with formatting.

```typescript
formatDistance(5000) // { value: "3.11", unit: "mi" }
```

#### `calculatePace(meters?: number, seconds?: number)`
Calculates pace in minutes per mile.

```typescript
calculatePace(5000, 2700) // "8:56"
```

#### `metersToKilometers(meters: number)`
Simple conversion from meters to kilometers.

```typescript
metersToKilometers(5000) // 5
```

#### `metersToMiles(meters: number)`
Simple conversion from meters to miles.

```typescript
metersToMiles(5000) // 3.106855
```

---

### Activity Icons (`activity-icons.tsx`)

Functions for mapping activity types to icons and colors.

#### `getActivityIcon(type?: string, sportType?: string)`
Returns the appropriate Lucide icon for an activity type.

```typescript
getActivityIcon('Run') // <Activity />
getActivityIcon('Ride', 'MountainBikeRide') // <Bike />
```

Supported types:
- Walk/Hike → Footprints
- Run/Trail Run → Activity
- Ride/MountainBikeRide/VirtualRide → Bike
- Workout/WeightTraining → Dumbbell
- AlpineSki/BackcountrySki → Mountain

#### `getActivityColor(type?: string)`
Returns a color value for an activity type.

```typescript
getActivityColor('Run') // '#ef4444' (red)
getActivityColor('Ride') // '#3b82f6' (blue)
```

---

## Usage Example

```typescript
import { 
  formatDuration, 
  formatDistance, 
  calculatePace,
  getActivityIcon,
  formatActivityDate 
} from '@/lib/activity'

function ActivityCard({ activity }) {
  const duration = formatDuration(activity.moving_time)
  const distance = formatDistance(activity.distance)
  const pace = calculatePace(activity.distance, activity.moving_time)
  const icon = getActivityIcon(activity.type, activity.sport_type)
  const date = formatActivityDate(activity.start_date_local)
  
  return (
    <div>
      {icon}
      <h3>{activity.name}</h3>
      <p>{date}</p>
      <p>Duration: {duration.value} {duration.units.join(' ')}</p>
      <p>Distance: {distance.value} {distance.unit}</p>
      <p>Pace: {pace}/mi</p>
    </div>
  )
}
```

---

## Benefits

- ✅ **Reusable**: Single source of truth for activity calculations
- ✅ **Testable**: Pure functions that are easy to unit test
- ✅ **Type-safe**: Full TypeScript support with type definitions
- ✅ **Documented**: JSDoc comments for IDE autocomplete
- ✅ **Maintainable**: Centralized logic, easy to update
- ✅ **Tree-shakeable**: Only import what you need

---

## Testing

```typescript
import { formatDuration, calculatePace } from '@/lib/activity'

describe('formatDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatDuration(3661)).toEqual({ 
      value: '1 1', 
      units: ['h', 'm'] 
    })
  })
})

describe('calculatePace', () => {
  it('calculates pace per mile', () => {
    expect(calculatePace(1609.34, 480)).toBe('8:00')
  })
})
```

