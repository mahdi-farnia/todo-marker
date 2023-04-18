import {
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { TbBrackets } from 'react-icons/tb';
import { CiExport } from 'react-icons/ci';
import { FiSave, FiCode, FiEye } from 'react-icons/fi';
import { ReactComponent as DoubleHash } from '../assets/dhash.svg';
import { ReactComponent as TripleHash } from '../assets/thash.svg';
import { ReactComponent as QuadHash } from '../assets/qhash.svg';
import { ReactComponent as FiveHash } from '../assets/5hash.svg';
import { useCallback, useState } from 'react';
import { useAppSelector } from '../store';

const Toolbar: React.FC = () => {
  const editor = useAppSelector((state) => state.editor.tabs);

  const openPreview = useCallback(() => {
    const docIndex: number = editor.openedDocIndexes[editor.activeIndex];

    window.open(`/preview?idx=${docIndex}`, '_blank');
  }, [editor]);

  return (
    <HStack as="aside" py={1} my={2} justifyContent="space-between">
      <Wrap>
        <WrapItem>
          <IconButton
            aria-label="Place H2 Header"
            title="H2"
            icon={<Icon as={DoubleHash} fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H3 Header"
            title="H3"
            icon={<Icon as={TripleHash} fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H4 Header"
            title="H4"
            icon={<Icon as={QuadHash} fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H5 Header"
            title="H5"
            icon={<Icon as={FiveHash} fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <Divider orientation="vertical" />
        <WrapItem>
          <IconButton
            aria-label="Place Checkbox Header"
            title="Checkbox"
            icon={<Icon as={TbBrackets} fontSize="lg" color="ios.primary" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place Code Block"
            title="Code Block"
            icon={<Icon as={FiCode} fontSize="lg" color="ios.primary" />}
            size="sm"
          />
        </WrapItem>
      </Wrap>
      <Wrap>
        <WrapItem>
          <Tooltip label="Open Preview In Another Tab" fontSize="xs" placement="top" variant="ios">
            <Button
              color="ios.primary"
              leftIcon={<Icon as={FiEye} fontSize="lg" />}
              onClick={openPreview}
              size="sm"
            >
              Preview
            </Button>
          </Tooltip>
        </WrapItem>
        <WrapItem>
          <SaveButton />
        </WrapItem>
        <WrapItem>
          <Button color="ios.primary" leftIcon={<Icon as={CiExport} fontSize="lg" />} size="sm">
            Export
          </Button>
        </WrapItem>
      </Wrap>
    </HStack>
  );
};

const SaveButton: React.FC = () => {
  const lastSaveDate = useAppSelector((state) => state.editor.doc.lastSaveDate);
  const [relativeTime, setRelativeTime] = useState<string>(
    lastSaveDate < 0 ? 'No Save Since Open' : relativeTimeFrom(lastSaveDate)
  );
  const onHover = useCallback(
    () => setRelativeTime(relativeTimeFrom(lastSaveDate)),
    [lastSaveDate]
  );

  return (
    <Tooltip label={relativeTime} fontSize="xs" placement="top" variant="ios">
      <Button
        color="ios.primary"
        leftIcon={<Icon as={FiSave} fontSize="lg" />}
        size="sm"
        onMouseOver={onHover}
      >
        Save
      </Button>
    </Tooltip>
  );
};

const relativeTimeFrom = (date: number): string =>
  new Intl.RelativeTimeFormat('en', { style: 'long' }).format(
    Math.ceil((date - Date.now()) / 60_000),
    'minutes'
  );

export default Toolbar;
