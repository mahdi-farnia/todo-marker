import {
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider
} from '@chakra-ui/react';
import { TbArrowsSort } from 'react-icons/tb';

const SidebarMenu: React.FC = () => (
  <Menu variant="ios" closeOnSelect={false}>
    <MenuButton as={Button} variant="ios" rightIcon={<Icon as={TbArrowsSort} />} size="xs">
      Sort By
    </MenuButton>
    <MenuList>
      <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
        <MenuItemOption value="asc">Ascending</MenuItemOption>
        <MenuItemOption value="desc">Descending</MenuItemOption>
      </MenuOptionGroup>
      <MenuDivider />
      <MenuOptionGroup defaultValue="name" title="Criteria" type="radio">
        <MenuItemOption value="name">Name</MenuItemOption>
        <MenuItemOption value="date-created">Date Created</MenuItemOption>
        <MenuItemOption value="date-modified">Date Modified</MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
);

export default SidebarMenu;
