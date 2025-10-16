/**
 * Distance and pace utility functions for activities
 */

const METERS_PER_MILE = 1609.34

/**
 * Format distance from meters to miles
 * @param meters - Distance in meters
 * @returns Formatted distance with value and unit
 * @example
 * formatDistance(5000) // { value: "3.11", unit: "mi" }
 */
export function formatDistance(meters?: number): { value: string; unit: string } {
  if (!meters) return { value: '0', unit: 'mi' }
  const miles = (meters / METERS_PER_MILE).toFixed(2)
  return { value: miles, unit: 'mi' }
}

/**
 * Calculate pace in minutes per mile
 * @param meters - Distance in meters
 * @param seconds - Time in seconds
 * @returns Formatted pace string (e.g., "8:45")
 * @example
 * calculatePace(5000, 2700) // "8:56"
 */
export function calculatePace(meters?: number, seconds?: number): string {
  if (!meters || !seconds || meters === 0) return '0:00'

  const miles = meters / METERS_PER_MILE
  const paceSeconds = seconds / miles
  const minutes = Math.floor(paceSeconds / 60)
  const secs = Math.floor(paceSeconds % 60)

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Convert meters to kilometers
 * @param meters - Distance in meters
 * @returns Distance in kilometers
 */
export function metersToKilometers(meters: number): number {
  return meters / 1000
}

/**
 * Convert meters to miles
 * @param meters - Distance in meters
 * @returns Distance in miles
 */
export function metersToMiles(meters: number): number {
  return meters / METERS_PER_MILE
}

