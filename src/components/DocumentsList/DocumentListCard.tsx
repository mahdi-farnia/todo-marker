import { ListItem, ListItemProps, useColorModeValue } from '@chakra-ui/react';

const DocumentListCard: React.FC<ListItemProps> = ({
  borderColor: _,
  border,
  rounded,
  cursor,
  userSelect,
  ...props
}) => {
  const borderColor = useColorModeValue('ios.light', 'ios.dark');

  return (
    <ListItem
      cursor="pointer"
      userSelect="none"
      rounded="md"
      border="2px dashed"
      borderColor={borderColor}
      {...props}
      mb={4}
      p={3}
    />
  );
};

export default DocumentListCard;
