import { Box, Heading, Text } from '@chakra-ui/react';

// TODO better design
const WelcomeEditor: React.FC = () => (
  <Box h="full" opacity={0.5} textAlign="center" cursor="default">
    <Heading>Todo Marker</Heading>
    <Text mt={10}>Markdown Creation Made Easy</Text>
  </Box>
);

export default WelcomeEditor;
