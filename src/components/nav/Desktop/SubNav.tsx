import {
   Box,
   Flex,
   Icon,
   Link,
   Stack,
   Text
} from '@chakra-ui/react';
import {
   FiChevronRight,
} from 'react-icons/fi';

/**
 * Desktop submenu navigation item component
 */
const DesktopSubNav = ({ label, href, subLabel }) => {
   return (
      <Link
         href={href ?? '#'}
         role="group"
         display="block"
         p={2}
         rounded="md"
         _hover={{ bg: 'transparent' }}>
         <Stack direction="row" align="center">
            <Box>
               <Text
                  transition="all .3s ease"
                  _groupHover={{ color: "accent" }}
                  fontWeight={500}>
                  {label}
               </Text>
               <Text fontSize="sm" color="muted">{subLabel}</Text>
            </Box>
            <Flex
               transition="all .3s ease"
               transform="translateX(-10px)"
               opacity={0}
               _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
               justify="flex-end"
               align="center"
               flex={1}>
               <Icon as={FiChevronRight} color="accent" boxSize="20px" />
            </Flex>
         </Stack>
      </Link>
   );
};

export default DesktopSubNav;
