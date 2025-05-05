import {
   Box,
   Link,
   Popover,
   Portal,
   Stack,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '../items';
import DesktopSubNav from './SubNav';

/**
 * Desktop navigation component with centered items
 */
const DesktopNav = () => {
   return (
      <Stack direction="row" justify="center">
         {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
               <Popover.Root>
                  <Popover.Trigger asChild>
                     <Link
                        p={2}
                        m={2}
                        href={navItem.href}
                        fontSize="sm"
                        fontWeight={500}
                        color="text"
                        position="relative"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                           textDecoration: 'none',
                           shadow: "md",
                           color: "accent",
                           borderColor: "accent",
                           _after: {
                              width: '50%'
                           }
                        }}
                        _after={{
                           content: '""',
                           position: 'absolute',
                           width: '0%',
                           height: '1px',
                           bottom: '0',
                           left: '50%',
                           transform: 'translateX(-50%)',
                           backgroundColor: "accent",
                           transition: 'width 0.3s ease'
                        }}
                     >
                        {navItem.label}
                     </Link>
                  </Popover.Trigger>

                  {navItem?.children && (
                     <Portal>
                        <Popover.Positioner>
                           <Popover.Content
                              border={0}
                              boxShadow="xl"
                              bg="card"
                              p={4}
                              rounded="xl"
                              minW="sm">
                              <Stack>
                                 {navItem.children.map((child) => (
                                    <DesktopSubNav key={child.label} {...child} />
                                 ))}
                              </Stack>
                           </Popover.Content>
                        </Popover.Positioner>
                     </Portal>
                  )}
               </Popover.Root>
            </Box>
         ))}
      </Stack>
   );
};

export default DesktopNav;
