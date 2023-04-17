import { Box, CloseButton, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useCallback, useId } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeEditor, openEditor } from '../store/editor.slice';

const Tabbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeEditorIndex, openedEditors } = useAppSelector((state) => state.editor);
  const todos = useAppSelector((state) => state.todos);
  const closeBtnId = useId();

  const onChange = useCallback(
    (tabIndex: number) => dispatch(openEditor(openedEditors[tabIndex])),
    [dispatch, openedEditors]
  );

  const onClose = useCallback(
    function (e: React.MouseEvent<HTMLDivElement>) {
      const target = e.target as HTMLElement;
      if (target.id !== closeBtnId) return;

      dispatch(closeEditor(Number(target.dataset.key)));
    },
    [dispatch]
  );

  return (
    <Tabs
      index={Math.max(activeEditorIndex, 0)}
      pos="absolute"
      onChange={onChange}
      top={5}
      left={10}
      variant="ios"
      w="calc(100% - 80px)"
    >
      <TabList
        onClick={onClose}
        gap={2}
        width="full"
        overflow="auto"
        scrollSnapType="x proximity"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none', appearance: 'none' }
        }}
      >
        {openedEditors.map((todoIndex, i) => (
          <Box key={i} pos="relative" scrollSnapAlign="start">
            <Tab minW={150} fontSize="small" pr={10}>
              {todos[todoIndex].title.slice(0, 25) || 'Untitled'}
            </Tab>
            <CloseButton
              data-key={i}
              id={closeBtnId}
              size="sm"
              ml="2"
              pos="absolute"
              right={1}
              top={1.5}
              color="ios.primary"
              sx={{ svg: { pointerEvents: 'none' } }}
            />
          </Box>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Tabbar;
