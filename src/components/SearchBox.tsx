import { Box, Input, InputGroup, InputLeftElement, Icon, BoxProps } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const SearchBox: React.FC<BoxProps> = ({ my, w, ...props }) => (
  <Box w="full" my={4} {...props}>
    <InputGroup variant="ios" size="sm">
      <InputLeftElement children={<Icon as={FiSearch} opacity={0.5} />} />
      <Input placeholder="Search" rounded="md" />
    </InputGroup>
  </Box>
);

export default SearchBox;
