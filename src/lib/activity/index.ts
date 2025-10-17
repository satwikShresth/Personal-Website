/**
 * Activity utilities barrel export
 *
 * This module provides utility functions for working with activity data,
 * including time formatting, distance calculations, and icon mapping.
 */

export {
   formatDuration,
   getRelativeTime,
   formatActivityDate
} from './time-utils';

export {
   formatDistance,
   calculatePace,
   metersToKilometers,
   metersToMiles
} from './distance-utils';

export {
   getActivityIcon,
   getActivityColor
} from './activity-icons';
