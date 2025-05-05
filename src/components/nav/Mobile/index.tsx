import {
   Stack,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '../items';
import MobileNavItem from './SubNav';

/**
 * Mobile navigation component that appears when the menu is toggled
 */
const MobileNav = () => {
   return (
      <Stack
         bg="card"
         p={4}
         display={{ md: 'none' }}
         boxShadow="md"
         backdropFilter="blur(10px)">
         {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
         ))}
      </Stack>
   );
};

export default MobileNav;
