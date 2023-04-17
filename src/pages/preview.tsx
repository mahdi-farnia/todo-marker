import { Text } from '@chakra-ui/react';
import { marked } from 'marked';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const sampleMarkdown = (index: number) => `# Previewing Document With Index ${index}

> But Not implemented yet!

- [x] should complete this

\`\`\`cpp
constexpr std::tuple<unsigned, std::string>{501, "Not Implemented"};
\`\`\`
`;

const PreviewPage: React.FC = () => {
  const [searchParam] = useSearchParams();

  const index = Number(searchParam.get('idx') ?? -1);
  if (window.isNaN(index) || index < 0) {
    return (
      <Text p={10}>
        Select a document to preview here! You should be able to select document here as soon as I
        completed the preview page
      </Text>
    );
  }

  return <RenderedMarkdown index={index} />;
};

const RenderedMarkdown: React.FC<{ index: number }> = ({ index }) => {
  const rendered = useMemo(() => marked(sampleMarkdown(index)), []);

  return <Text dangerouslySetInnerHTML={{ __html: rendered }} p={10} />;
};

export default PreviewPage;
