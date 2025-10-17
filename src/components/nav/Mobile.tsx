import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { NAV_ITEMS } from './items';

const MobileNav = () => {
   return (
      <Stack bg="card" p={4} borderRadius={'lg'} gap={5}>
         {NAV_ITEMS.map(({ label, section, href }) => (
            <Link
               key={`mobile-${label}`}
               to={`${href}${section}`}
               hashScrollIntoView={true}
            >
               <ChakraLink _hover={{ color: 'accent' }} fontWeight={600}>
                  <Text>{label}</Text>
               </ChakraLink>
            </Link>
         ))}
      </Stack>
   );
};

export default MobileNav;
