import { HStack } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import EditorPane from '../components/EditorPane';

const HomePage: React.FC = () => (
  <HStack minH="100vh" alignItems="stretch" spacing={0}>
    <Sidebar />
    <EditorPane />
  </HStack>
);

export default HomePage;
