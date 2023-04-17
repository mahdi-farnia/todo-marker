import {
  Box,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { HiHashtag } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../store';
import WelcomeEditor from './WelcomeEditor';
import { useCallback } from 'react';
import { mutateTodo } from '../store/todos.slice';
import Toolbar from './Toolbar';

// IMPORTANT Maybe form with event change, enough for all mutations

const Editor: React.FC = () => {
  const editor = useAppSelector((state) => state.editor);
  const todos = useAppSelector((state) => state.todos);
  const todosIndex = editor.openedEditors[editor.activeEditorIndex];

  const dispatch = useAppDispatch();
  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;

      dispatch(
        mutateTodo({
          index: todosIndex,
          title: target.value
        })
      );
    },
    [dispatch, editor]
  );

  const bgColor = useColorModeValue('#fafafa', '#111');
  const shadow = useColorModeValue(
    '-5px -5px 8px 0 white, 5px 5px 3px 0 #efefef',
    'inset -5px -5px 10px 0 hsl(0 0% 14% / 1), inset 5px 5px 8px 0 hsl(0 0% 5% / 1)'
  );

  if (editor.activeEditorIndex < 0) {
    return <WelcomeEditor />;
  }

  const todo = todos[todosIndex];

  return (
    <Box h="full" bgColor={bgColor} rounded="2xl" boxShadow={shadow} pt={8} pb={3} px={5}>
      <InputGroup size="lg">
        <InputLeftElement children={<Icon as={HiHashtag} />} />
        <Input variant="ios" rounded="lg" value={todo.title} onChange={onTitleChange} />
      </InputGroup>
      <Toolbar />
      <Divider borderTopWidth={2} borderTopStyle="dashed" borderBottom="none" />
      <Text>{todo.content}</Text>
    </Box>
  );
};

export default Editor;
