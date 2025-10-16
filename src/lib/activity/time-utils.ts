/**
 * Time and duration utility functions for activities
 */

/**
 * Format duration from seconds to human-readable format
 * @param seconds - Duration in seconds
 * @returns Formatted duration with value and units
 * @example
 * formatDuration(3661) // { value: "1 1", units: ["h", "m"] }
 * formatDuration(125) // { value: "2 5", units: ["m", "s"] }
 */
export function formatDuration(seconds?: number): { value: string; units: string[] } {
  if (!seconds) return { value: '0', units: ['s'] }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return { value: `${hours} ${minutes}`, units: ['h', 'm'] }
  }
  return { value: `${minutes} ${secs}`, units: ['m', 's'] }
}

/**
 * Calculate relative time from a date string
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 days 3hr ago")
 */
export function getRelativeTime(dateString?: string): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours}hr ago`
  }
  
  if (hours > 0) {
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}hr ${mins}min ago`
  }
  
  const mins = Math.floor(diffMs / (1000 * 60))
  return `${mins} min ago`
}

/**
 * Format activity date to "Day at Time [relative]"
 * @param dateString - ISO date string
 * @returns Formatted date string
 * @example
 * formatActivityDate("2024-01-15T14:30:00Z") // "Monday at 2:30 PM [2 days 3hr ago]"
 */
export function formatActivityDate(dateString?: string): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const time = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  })
  const relative = getRelativeTime(dateString)
  
  return `${dayOfWeek} at ${time} [${relative}]`
}

