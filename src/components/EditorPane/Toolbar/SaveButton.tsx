import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState, useCallback, useReducer } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { saveActiveEditor } from '@/store/editor.slice';

const SaveButton: React.FC = () => {
  const lastSaveDate = useAppSelector((state) => state.editor.doc.lastSaveDate);
  const [relativeTime, setRelativeTime] = useState<string>(relativeTimeFrom(lastSaveDate));
  const onHover = useCallback(
    () => setRelativeTime(relativeTimeFrom(lastSaveDate)),
    [lastSaveDate]
  );

  const dispatch = useAppDispatch();
  const saveDocument = useCallback(() => dispatch(saveActiveEditor()), []);

  return (
    <Tooltip label={relativeTime} fontSize="xs" placement="top" variant="ios">
      <Button
        color="ios.primary"
        leftIcon={<Icon as={FiSave} fontSize="lg" />}
        size="sm"
        onMouseOver={onHover}
        onClick={saveDocument}
      >
        Save
      </Button>
    </Tooltip>
  );
};

const relativeTimeFrom = (date: number): string =>
  date < 0
    ? 'No Save Since Open'
    : new Intl.RelativeTimeFormat('en', { style: 'long' }).format(
        Math.ceil((date - Date.now()) / 60_000),
        'minutes'
      );

export default SaveButton;
