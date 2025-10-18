import { Footprints, Bike, Activity, Dumbbell, Mountain } from 'lucide-react';
import { Icon } from '@chakra-ui/react';
import { HikeIcon, RunIcon, RockClimbIcon } from './icons';

type ActivityType = string | undefined;


export function getActivityIcon(
   type?: ActivityType,
   sportType?: ActivityType,
   color?: string
): React.ReactElement {
   const iconType = sportType || type;
   const iconProps = { color: color ?? 'accent', size: 'lg', strokeWidth: '2.5' } as any;

   const iconMap: Record<string, React.ReactElement> = {
      walk: <Icon as={Footprints} {...iconProps} />,
      hike: <Icon as={HikeIcon} {...iconProps} />,
      run: <Icon as={RunIcon} {...iconProps} />,
      'trail run': <Icon as={RunIcon} {...iconProps} />,
      ride: <Icon as={Bike} {...iconProps} />,
      mountainbikeride: <Icon as={Bike} {...iconProps} />,
      virtualride: <Icon as={Bike} {...iconProps} />,
      workout: <Icon as={Dumbbell} {...iconProps} />,
      weighttraining: <Icon as={Dumbbell} {...iconProps} />,
      alpineski: <Icon as={Mountain} {...iconProps} />,
      backcountryski: <Icon as={Mountain} {...iconProps} />,
      rockclimbing: <Icon as={RockClimbIcon} {...iconProps} />
   };

   const normalizedType = iconType?.toLowerCase() || '';
   return iconMap[normalizedType] || <Activity {...iconProps} />;
}

/**
 * Get a color scheme for an activity type
 * @param type - Activity type
 * @returns Color value for the activity
 */
export function getActivityColor(type?: ActivityType): string {
   const normalizedType = type?.toLowerCase() || '';

   const colorMap: Record<string, string> = {
      walk: '#10b981',
      hike: '#10b981',
      run: '#ef4444',
      'trail run': '#ef4444',
      ride: '#3b82f6',
      mountainbikeride: '#3b82f6',
      virtualride: '#3b82f6',
      workout: '#f59e0b',
      weighttraining: '#f59e0b',
      alpineski: '#06b6d4',
      backcountryski: '#06b6d4'
   };

   return colorMap[normalizedType] || '#6b7280';
}
