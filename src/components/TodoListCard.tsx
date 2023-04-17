import { ListItem, ListItemProps, useColorModeValue } from '@chakra-ui/react';

const TodoListCard: React.FC<ListItemProps> = ({
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
      mt={4}
      p={3}
    />
  );
};

export default TodoListCard;
