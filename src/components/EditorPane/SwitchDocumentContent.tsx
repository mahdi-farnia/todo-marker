import { DocumentContent, DocumentContentType } from '@/store/documents.slice';
import { Box, Checkbox, HStack, Text } from '@chakra-ui/react';
import DocumentContentHeading from './DocumentContentHeading';
import { memo } from 'react';

const DocumentContentSwitch: React.FC<{
  content: DocumentContent;
  'data-content-index': number;
}> = ({ content, 'data-content-index': dataContentIndex }) => {
  switch (content.type) {
    case DocumentContentType.H2:
    case DocumentContentType.H4:
    case DocumentContentType.H3:
    case DocumentContentType.H5:
      return (
        <DocumentContentHeading
          data-content-index={dataContentIndex}
          kind={content.type}
          value={content.value}
        />
      );

    case DocumentContentType.CheckBox:
      return (
        <HStack data-content-index={dataContentIndex}>
          <Checkbox size="sm" checked={content.checked} ml={`${content.indent * 10}px`} />
          <Text fontSize="sm" contentEditable>
            {content.value}
          </Text>
        </HStack>
      );

    case DocumentContentType.CodeBlock:
      return (
        <Text
          data-content-index={dataContentIndex}
          fontFamily="mono"
          fontSize="sm"
          data-lang={content.lang}
          variant="code"
          contentEditable
        >
          {content.value}
        </Text>
      );

    case DocumentContentType.BasicString:
    default:
      return (
        <Box data-content-index={dataContentIndex}>
          <Text fontSize="sm" variant="markdown" wordBreak="break-all" mb={2} contentEditable>
            {content.value}
          </Text>
        </Box>
      );
  }
};

export default memo(DocumentContentSwitch);
