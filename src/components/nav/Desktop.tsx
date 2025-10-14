import { Box, Link as ChakraLink, Stack } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { NAV_ITEMS } from './items'

const DesktopNav = () => (
  <Stack direction="row" justify="center">
    {NAV_ITEMS.map((navItem) => (
      <Box key={navItem.label}>
        <Link to={`${navItem.href}${navItem.section}`} hashScrollIntoView={true} >
          <ChakraLink
            p={2}
            m={2}
            fontSize="sm"
            fontWeight={500}
            color="text"
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            _hover={{
              textDecoration: 'none',
              shadow: 'md',
              color: 'accent',
              borderColor: 'accent',
              _after: {
                width: '50%',
              },
            }}
            _after={{
              content: '""',
              position: 'absolute',
              width: '0%',
              height: '1px',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'accent',
              transition: 'width 0.3s ease',
            }}
          >
            {navItem.label}
          </ChakraLink>
        </Link>
      </Box>
    ))}
  </Stack>
)

export default DesktopNav
