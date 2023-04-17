import { Box, Heading, List, ListProps, Text, useColorModeValue } from '@chakra-ui/react';
import TodoListCard from './TodoListCard';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { openEditor } from '../store/editor.slice';

const TodoList: React.FC<ListProps> = ({ flex, pb, overflow, ...props }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      const target = e.target as HTMLElement;

      if (target.tagName.toLowerCase() !== 'li') return;

      dispatch(openEditor(Number(target.dataset.key)));
    },
    [dispatch]
  );

  return (
    <List onClickCapture={onClick} flex={1} pb={3} overflow="auto" w="full" {...props}>
      {todos.map((datum, i) => (
        <TodoListCard key={i} data-key={i}>
          <Box display="contents" pointerEvents="none">
            <Heading as="h6" fontSize="md" noOfLines={1} mb={1}>
              {datum.title || 'Untitled'}
            </Heading>
            {datum.content.length === 0 ? (
              <Text opacity={0.5} fontSize="x-small" fontWeight="semibold" pl={1}>
                Empty Description
              </Text>
            ) : (
              <Text noOfLines={2} fontSize="smaller" pl={1}>
                {datum.content}
              </Text>
            )}
            <Text mt={2} fontSize="x-small" fontWeight="semibold" lang="fa" opacity={0.3}>
              Modified on {formatDate(datum.lastModified)}
            </Text>
          </Box>
        </TodoListCard>
      ))}
    </List>
  );
};

const formatDate = (date: number) =>
  Intl.DateTimeFormat('en', {
    calendar: 'persian',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);

export default TodoList;
