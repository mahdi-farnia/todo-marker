import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAppSelector } from '@/store';

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

export default SaveButton;
