import {
   Box,
   Collapsible,
   Flex,
   IconButton,
   Text,
   useDisclosure,
} from '@chakra-ui/react';

import {
   FiMenu,
   FiMoon,
   FiSun,
   FiX
} from 'react-icons/fi';

import { Link } from '@tanstack/react-router';
import DesktopNav from './Desktop';
import MobileNav from './Mobile';
import { useColorMode, useColorModeValue } from '@/components/ui/color-mode';

export default function Navbar() {
   const { open, onToggle } = useDisclosure();
   const { colorMode, toggleColorMode } = useColorMode();

   return (
      <Box position="sticky" top="0" zIndex="sticky">
         <Flex
            bg="transparent"
            minH="60px"
            py={{ base: 2 }}
            px={{ base: 4 }}
            align="center"
            transition="all 0.3s ease">

            {/* Mobile menu button */}
            <Flex
               flex={{ base: 1, md: 'auto' }}
               ml={{ base: -2 }}
               display={{ base: 'flex', md: 'none' }}>
               <IconButton
                  onClick={onToggle}
                  variant="ghost"
                  aria-label="Toggle Navigation"
               >
                  {open ? <FiX size={20} /> : <FiMenu size={20} />}
               </IconButton>
            </Flex>

            {/* Logo */}
            <Flex
               flex={{ base: 1 }}
               justify="center"
               align="center"
               position="relative">
               <Text
                  as={Link}
                  position={{ base: "relative", md: "absolute" }}
                  left={{ md: "0" }}
                  textAlign={{ base: 'center', md: 'left' }}
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize="xl"
                  href="/"
                  color={useColorModeValue('gray.800', 'white')}
               >
                  Satwik
               </Text>

               {/* Desktop Navigation - Centered */}
               <Flex
                  display={{ base: 'none', md: 'flex' }}
                  justify="center"
                  width="100%">
                  <DesktopNav />
               </Flex>
            </Flex>

            {/* Color mode toggle */}
            <Flex
               flex={{ base: 1, md: 0 }}
               justify="flex-end"
               direction="row"
            >
               <IconButton
                  aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                  variant="ghost"
                  onClick={toggleColorMode}
               >
                  {colorMode === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
               </IconButton>
            </Flex>
         </Flex>

         {/* Mobile Navigation */}
         <Collapsible.Root open={open}>
            <Collapsible.Content>
               <MobileNav />
            </Collapsible.Content>
         </Collapsible.Root>
      </Box>
   );
}
