import { HStack, Heading, Icon, IconButton, VStack, useColorModeValue } from '@chakra-ui/react';
import { useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch } from '../store';
import { addTodo, dev_createTodo } from '../store/todos.slice';
import SearchBox from './SearchBox';
import TodoList from './TodoList';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const onCreate = useCallback(
    () => dispatch(addTodo(dev_createTodo(`Sample ${Math.floor(Math.random() * 100)}`))),
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
      <HStack justifyContent="space-between" w="full" pl={4} px={6}>
        <Heading
          as="h4"
          textTransform="uppercase"
          fontSize="x-small"
          opacity={0.5}
          cursor="default"
        >
          Todos
        </Heading>
        <IconButton
          aria-label="Create New Todo"
          variant="ios"
          size="xs"
          onClick={onCreate}
          icon={<Icon as={AiOutlinePlus} />}
        />
      </HStack>
      <TodoList px={6} />
    </VStack>
  );
};

export default Sidebar;
