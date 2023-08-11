import { useAppDispatch, useAppSelector } from '@/store';
import { mutateDocument } from '@/store/documents.slice';
import {
  Box,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { HiHashtag } from 'react-icons/hi';
import DocumentContentSwitch from './SwitchDocumentContent';
import Toolbar from './Toolbar';
import WelcomeEditor from './WelcomeEditor';

// refactor components that need document state data to prevent rerendering of Toolbar & etc...

const Editor: React.FC = () => {
  // Redux states
  const editor = useAppSelector((state) => state.editor.tabs);
  const documents = useAppSelector((state) => state.documents);
  const documentsIndex = editor.openedDocIndexes[editor.activeIndex];

  const dispatch = useAppDispatch();

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLHeadingElement>) => {
      const target = e.target as HTMLInputElement;

      dispatch(
        mutateDocument({
          index: documentsIndex,
          title: target.value
        })
      );
    },
    [documentsIndex]
  );

  const preventEnterKeyOnInputLike = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (e.key === 'Enter' && target.dataset.hasOwnProperty('inputLike')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, []);

  // Would delete element if:
  // const shouldDeleteElement = /delete(Hard|Soft)LineBackward/i.test(
  //   (e as InputEvent).inputType
  // );

  // console.table({ shouldDeleteElement });

  // Ui states
  const bgColor = useColorModeValue('#fafafa', '#111');
  const shadow = useColorModeValue(
    '-5px -5px 8px 0 white, 5px 5px 3px 0 #efefef',
    'inset -5px -5px 10px 0 hsl(0 0% 14% / 1), inset 5px 5px 8px 0 hsl(0 0% 5% / 1)'
  );

  if (editor.activeIndex < 0) {
    return <WelcomeEditor />;
  }

  const doc = documents[documentsIndex];

  return (
    <VStack
      as="form"
      h="full"
      bgColor={bgColor}
      rounded="2xl"
      boxShadow={shadow}
      pt={8}
      pb={3}
      px={5}
      alignItems="stretch"
      onSubmit={preventDefault}
    >
      <Box>
        <InputGroup size="lg">
          <InputLeftElement children={<Icon as={HiHashtag} />} />
          <Input variant="ios" rounded="lg" value={doc.title} onChange={onTitleChange} />
        </InputGroup>
        <Toolbar />
        <Divider borderTopWidth={2} borderTopStyle="dashed" borderBottom="none" mb={2} />
      </Box>
      <Box overflow="auto" w="full" flex={1} onKeyDown={preventEnterKeyOnInputLike}>
        {doc.contents.map((content, i) => (
          <DocumentContentSwitch key={i} data-content-index={i} content={content} />
        ))}
      </Box>
    </VStack>
  );
};

const preventDefault: React.FormEventHandler = (e) => e.preventDefault();

export default Editor;
