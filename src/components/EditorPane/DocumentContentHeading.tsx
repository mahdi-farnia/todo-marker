import DoubleHash from '@/icons/DoubleHash';
import FiveHash from '@/icons/FiveHash';
import QuadHash from '@/icons/QuadHash';
import TripleHash from '@/icons/TripleHash';
import { DocumentContentType } from '@/store/documents.slice';
import { Box, Icon, Text } from '@chakra-ui/react';

type DocumentContentTypeHeading =
  | DocumentContentType.H2
  | DocumentContentType.H3
  | DocumentContentType.H4
  | DocumentContentType.H5;

const MarkdownHeadingSizes: Record<
  DocumentContentTypeHeading,
  { size: string; icon: React.ElementType }
> = {
  [DocumentContentType.H2]: { size: '2xl', icon: DoubleHash },
  [DocumentContentType.H3]: { size: 'xl', icon: TripleHash },
  [DocumentContentType.H4]: { size: 'lg', icon: QuadHash },
  [DocumentContentType.H5]: { size: 'md', icon: FiveHash }
};

const DocumentContentHeading: React.FC<{
  value: string;
  kind: DocumentContentTypeHeading;
  'data-content-index': number;
}> = ({ value, kind, 'data-content-index': dataContentIndex }) => (
  <Box mb={3} pos="relative" data-content-index={dataContentIndex}>
    <Icon
      as={MarkdownHeadingSizes[kind].icon}
      px={1}
      h="full"
      fontSize="2xl"
      pos="absolute"
      left={2}
      top={0}
    />
    <Text
      variant="markdown_input"
      fontSize={MarkdownHeadingSizes[kind].size}
      data-input-like
      contentEditable
    >
      {value}
    </Text>
  </Box>
);

export default DocumentContentHeading;
