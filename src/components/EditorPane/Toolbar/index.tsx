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
import { useCallback } from 'react';
import { CiExport } from 'react-icons/ci';
import { FiCode, FiEye } from 'react-icons/fi';
import { TbBrackets } from 'react-icons/tb';
import { useAppSelector } from '@/store';
import SaveButton from './SaveButton';
import DoubleHash from '@/icons/DoubleHash';
import FiveHash from '@/icons/FiveHash';
import QuadHash from '@/icons/QuadHash';
import TripleHash from '@/icons/TripleHash';

const Toolbar: React.FC = () => {
  const tabs = useAppSelector((state) => state.editor.tabs);

  const openPreview = useCallback(() => {
    const docIndex: number = tabs.openedDocIndexes[tabs.activeIndex];

    window.open(`/preview?idx=${docIndex}`, '_blank');
  }, [tabs]);

  return (
    <HStack as="aside" py={1} my={2} justifyContent="space-between">
      <Wrap>
        <WrapItem>
          <IconButton
            aria-label="Place H2 Header"
            title="H2"
            icon={<Icon as={DoubleHash} color="#3478f6" fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H3 Header"
            title="H3"
            icon={<Icon as={TripleHash} color="#3478f6" fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H4 Header"
            title="H4"
            icon={<Icon as={QuadHash} color="#3478f6" fontSize="lg" />}
            size="sm"
          />
        </WrapItem>
        <WrapItem>
          <IconButton
            aria-label="Place H5 Header"
            title="H5"
            icon={<Icon as={FiveHash} color="#3478f6" fontSize="lg" />}
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

export default Toolbar;
