import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import Tabbar from './Tabbar';
import Editor from './Editor';

const EditorPane: React.FC = () => {
  return (
    <Box as="section" flex={1} pt={10} pb={5} px={5} pos="relative" overflow="hidden">
      <VisuallyHidden>
        <Heading>Editor Area</Heading>
      </VisuallyHidden>
      <Tabbar />
      <Editor />
    </Box>
  );
};

export default EditorPane;
