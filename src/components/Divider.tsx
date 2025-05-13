import { Box, Separator } from "@chakra-ui/react";

export default function Divider() {
  return (
    <Box width="80%" my={4}>
      <Separator
        borderWidth="2px"
        borderRadius="full"
        height="4px"
        borderColor={"colorPalette.300"}
      />
    </Box>
  );
}
