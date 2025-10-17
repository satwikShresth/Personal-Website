import * as React from 'react';
import { Box, Text, VStack, HStack, ScrollArea, For, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { orpc } from '@/orpc/client';
import { Link } from '@tanstack/react-router';
import { getActivityIcon } from '@/lib/activity';

interface HeatmapGridProps {
   weeks: (Date | null)[][];
   monthLabels: { month: string; weekIndex: number }[];
   activityData: Record<string, { count: number; sportType: string }>;
}

function HeatmapGrid({ weeks, monthLabels, activityData }: HeatmapGridProps) {
   const getActivityLevel = (count: number): string => {
      if (count === 0) return 'gray.100';
      return 'accent';
   };

   const getActivityLevelDark = (count: number): string => {
      if (count === 0) return 'gray.800';
      return 'accent';
   };

   return (
      <ScrollArea.Root size="xs" width="full">
         <ScrollArea.Viewport>
            <ScrollArea.Content py="2">
               <VStack align="start" gap={2}>
                  {/* Month Labels */}
                  <HStack gap={1} h="20px" flexWrap="nowrap">
                     {weeks.map((_, weekIdx) => {
                        const monthLabel = monthLabels.find(m => m.weekIndex === weekIdx);
                        const isMonthStart = monthLabel !== undefined;
                        return (
                           <Box
                              key={weekIdx}
                              w="12px"
                              flexShrink={0}
                              ml={isMonthStart && weekIdx > 0 ? 1.5 : 0}
                              position="relative"
                           >
                              {monthLabel && (
                                 <Text
                                    fontSize="2xs"
                                    fontWeight="medium"
                                    whiteSpace="nowrap"
                                    position="absolute"
                                 >
                                    {monthLabel.month}
                                 </Text>
                              )}
                           </Box>
                        );
                     })}
                  </HStack>

                  {/* Grid */}
                  <HStack gap={1} align="start" flexWrap="nowrap">
                     {weeks.map((week, weekIdx) => {
                        const isMonthStart = monthLabels.find(m => m.weekIndex === weekIdx);
                        return (
                           <VStack
                              key={weekIdx}
                              gap={1.5}
                              flexShrink={0}
                              ml={isMonthStart && weekIdx > 0 ? 1.5 : 0}
                           >
                              <For each={Array.from({ length: 7 }) as Array<Record<string, number>>}>
                                 {(_, dayIdx) => {
                                    const day = week[dayIdx];
                                    const dateKey = day ? day.toISOString().split('T')[0] : '';
                                    const activity = activityData[dateKey];
                                    const activityCount = activity?.count ?? 0;
                                    const sportType = activity?.sportType;

                                    return (
                                       <Box
                                          key={`${weekIdx}-${dayIdx}`}
                                          w="12px"
                                          h="12px"
                                          bg={day ? getActivityLevel(activityCount) : 'transparent'}
                                          borderRadius="2px"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                          position="relative"
                                          title={
                                             day
                                                ? `${day.toDateString()}${activity ? ` - ${activityCount} ${activityCount === 1 ? 'activity' : 'activities'} (${sportType})` : ''}`
                                                : ''
                                          }
                                          _dark={{ bg: day ? getActivityLevelDark(activityCount) : 'transparent' }}
                                       >
                                          {activity && sportType && (
                                             <Box
                                                fontSize="8px"
                                                color="white"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                css={{
                                                   '& svg': {
                                                      fill: 'white !important',
                                                      color: 'white !important'
                                                   }
                                                }}
                                             >
                                                {React.cloneElement(getActivityIcon(undefined, sportType), {
                                                   //@ts-ignore: shupp
                                                   style: { width: '8px', height: '8px', fill: 'white', color: 'white' }
                                                })}
                                             </Box>
                                          )}
                                       </Box>
                                    );
                                 }}
                              </For>
                           </VStack>
                        );
                     })}
                  </HStack>
               </VStack>
            </ScrollArea.Content>
         </ScrollArea.Viewport>
         <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
         </ScrollArea.Scrollbar>
      </ScrollArea.Root>
   );
}

interface YearNavigationProps {
   selectedYear: number;
}

function YearNavigation({ selectedYear }: YearNavigationProps) {
   const currentYear = new Date().getFullYear();
   const isCurrentYear = selectedYear >= currentYear;
   const _hoverStyle = {
      transform: 'scale(1.2)',
      bg: 'transparent',
      color: 'accent'
   }

   return (
      <HStack justify="center" align="center">
         <HStack gap={2}>
            <Link to="/activity" search={{ year: selectedYear - 1 }}>
               <Button
                  variant='ghost'
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="medium"
                  cursor="pointer"
                  borderRadius="md"
                  _hover={_hoverStyle}
               >
                  ← {selectedYear - 1}
               </Button>
            </Link>
            <Text fontSize="xl" fontWeight="bold">
               {selectedYear}
            </Text>
            <Link to="/activity" search={{ year: selectedYear + 1 }}>
               <Button
                  px={3}
                  py={1}
                  variant='ghost'
                  fontSize="sm"
                  fontWeight="medium"
                  disabled={isCurrentYear}
                  cursor={isCurrentYear ? 'not-allowed' : 'pointer'}
                  borderRadius="md"
                  opacity={isCurrentYear ? 0.4 : 1}
                  _hover={_hoverStyle}
               >
                  {selectedYear + 1} →
               </Button>
            </Link>
         </HStack>
      </HStack >
   );
}

function generateYearData(year: number) {
   const startDate = new Date(year, 0, 1);
   const endDate = new Date(year, 11, 31);

   // Generate all days in the year
   const days: Date[] = [];
   for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
   }

   // Group days by week (Sunday to Saturday)
   const weeks: (Date | null)[][] = [];
   let currentWeek: (Date | null)[] = [];

   // Pad the first week with empty days if needed
   const firstDayOfWeek = startDate.getDay();
   for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
   }

   days.forEach(day => {
      currentWeek.push(day);
      if (day.getDay() === 6) {
         // Saturday
         weeks.push(currentWeek);
         currentWeek = [];
      }
   });

   // Add remaining days
   if (currentWeek.length > 0) {
      weeks.push(currentWeek);
   }

   // Calculate which week starts each month
   const monthLabels: { month: string; weekIndex: number }[] = [];
   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   weeks.forEach((week, weekIdx) => {
      const firstDayOfWeek = week.find(d => d !== null);
      if (firstDayOfWeek) {
         const month = firstDayOfWeek.getMonth();
         const date = firstDayOfWeek.getDate();
         if (date <= 7 && !monthLabels.find(m => m.month === monthNames[month])) {
            monthLabels.push({ month: monthNames[month], weekIndex: weekIdx });
         }
      }
   });

   return { weeks, monthLabels };
}

interface StravaActivityHeatMapProps {
   year?: number;
}

export function StravaActivityHeatMap({ year }: StravaActivityHeatMapProps) {
   const selectedYear = year ?? new Date().getFullYear();

   const { weeks, monthLabels } = React.useMemo(() => generateYearData(selectedYear), [selectedYear]);

   const { data: activityData = {} } = useQuery(orpc.strava.getActivityDates.queryOptions({
      input: { year: selectedYear },
      staleTime: 1000 * 60 * 5,
   }));


   return (
      <VStack align="stretch" gap={4}>
         {/* Heatmap Grid */}
         <Box py={2} w="full">
            <HeatmapGrid weeks={weeks} monthLabels={monthLabels} activityData={activityData as any} />
         </Box>

         {/* Year Navigation */}
         <YearNavigation selectedYear={selectedYear} />
      </VStack>
   );
}

