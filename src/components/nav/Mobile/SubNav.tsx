import {
   Collapsible,
   Flex,
   Icon,
   Link,
   Stack,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import {
   FiChevronDown,
} from 'react-icons/fi';

/**
 * Mobile navigation item component with collapsible children
 */
const MobileNavItem = ({ label, children, href }) => {
   const { open, onToggle } = useDisclosure();

   return (
      <Stack onClick={children && onToggle} cursor={children ? "pointer" : "default"}>
         <Flex
            py={2}
            justify="space-between"
            align="center"
            _hover={{
               textDecoration: 'none',
            }}>
            <Text
               fontWeight={600}
               color="text">
               {label}
            </Text>

            {href && !children && (
               <Link href={href ?? '#'} _hover={{ color: "accent" }}>
                  <Text>View</Text>
               </Link>
            )}

            {children && (
               <Icon
                  as={FiChevronDown}
                  transition="all .25s ease-in-out"
                  transform={open ? 'rotate(180deg)' : ''}
                  w={6}
                  h={6}
                  color="accent"
               />
            )}
         </Flex>

         <Collapsible.Root open={open}>
            <Collapsible.Content>
               <Stack
                  mt={2}
                  pl={4}
                  borderLeft={1}
                  borderStyle={'solid'}
                  borderColor="accent"
                  align="start">
                  {children &&
                     children.map((child) => (
                        <Link
                           key={child.label}
                           py={2}
                           href={child.href ?? '#'}
                           color="text"
                           _hover={{ color: "accent" }}
                        >
                           {child.label}
                        </Link>
                     ))}
               </Stack>
            </Collapsible.Content>
         </Collapsible.Root>
      </Stack>
   );
};

export default MobileNavItem;
