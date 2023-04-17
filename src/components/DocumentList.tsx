import { Box, Heading, List as ChakraList, ListProps, Text } from '@chakra-ui/react';
import DocumentListCard from './DocumentListCard';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { openEditor } from '../store/editor.slice';
import { IDocument } from '../store/documents.slice';

interface ISortedDocument extends IDocument {
  /** index in the original array */
  index: number;
}

const DocumentList: React.FC<ListProps> = ({ flex, pb, overflow, ...props }) => {
  const dispatch = useAppDispatch();
  const allDocs = useAppSelector((state) => state.documents);
  const openDocument = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      const target = e.target as HTMLElement;

      if (target.tagName.toLowerCase() !== 'li') return;

      dispatch(openEditor(Number(target.dataset.key)));
    },
    [dispatch]
  );

  const [documents, pinnedDocs] = allDocs.reduce(
    (acc, curr, index) => {
      acc[Number(curr.pinned)].push(Object.assign({ index }, curr) as ISortedDocument);

      return acc;
    },
    [[], []] as [ISortedDocument[], ISortedDocument[]]
  );

  return (
    <Box overflow="auto" {...props}>
      <ListHeader title="Pinned" />
      <List docs={pinnedDocs} onClickCapture={openDocument} />
      <ListHeader title="Documents" />
      <List docs={documents} onClickCapture={openDocument} />
    </Box>
  );
};

const ListHeader: React.FC<{ title: string }> = ({ title }) => (
  <Heading
    as="h4"
    textTransform="uppercase"
    fontSize="x-small"
    opacity={0.5}
    cursor="default"
    mb={2}
  >
    {title}
  </Heading>
);

const List: React.FC<ListProps & { docs: ISortedDocument[] }> = ({ docs, ...props }) => (
  <ChakraList flex={1} w="full" {...props}>
    {docs.map((datum) => (
      <DocumentListCard key={datum.index} data-key={datum.index}>
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
      </DocumentListCard>
    ))}
  </ChakraList>
);

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

export default DocumentList;
