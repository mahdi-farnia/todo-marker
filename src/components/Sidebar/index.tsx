import { HStack, Heading, Icon, IconButton, VStack, useColorModeValue } from '@chakra-ui/react';
import { useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch } from '@/store';
import { addDocument } from '@/store/documents.slice';
import { dev_createDocument } from '@/store/dev_seedDocuments';
import DocumentsList from '@/components/DocumentsList';
import SearchBox from './SearchBox';
import SidebarMenu from './SidebarMenu';

// TODO open empty document for creation
// TODO search documents

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const onCreate = useCallback(
    () =>
      dispatch(
        addDocument(
          dev_createDocument(
            `Sample ${Math.floor(Math.random() * 100)}`,
            [{ type: 0, value: 'Empty' }],
            Math.random() >= 0.5
          )
        )
      ),
    [dispatch]
  );

  const bgColor = useColorModeValue('#f0f0f0', '#000');

  return (
    <VStack
      alignItems="flex-start"
      as="nav"
      w={280}
      h="100vh"
      bgColor={bgColor}
      position="relative"
      overflow="hidden"
    >
      <Heading opacity={0.5} px={6} pt={5} cursor="default" fontSize="2xl">
        Menu
      </Heading>
      <SearchBox px={6} />
      <HStack justifyContent="space-between" w="full" px={6}>
        <SidebarMenu />
        <IconButton
          aria-label="Create New Document"
          variant="ios"
          size="xs"
          onClick={onCreate}
          icon={<Icon as={AiOutlinePlus} />}
        />
      </HStack>
      <DocumentsList px={6} />
    </VStack>
  );
};

export default Sidebar;
