import type { DocumentContent, IDocument } from './documents.slice';

export const dev_DocumentInitialState: IDocument[] = [
  dev_createDocument(
    'Document Marker',
    [
      {
        type: 0,
        value: 'Best useful application I ever made (kinda!)'
      },
      {
        type: 1,
        value: 'H2'
      },
      {
        type: 0,
        value: 'Sample Description'
      },
      {
        type: 2,
        value: 'H3'
      },
      {
        type: 0,
        value: 'Sample Description'
      },
      {
        type: 3,
        value: 'H4'
      },
      {
        type: 0,
        value: 'Sample Description'
      },
      {
        type: 4,
        value: 'H5'
      },
      {
        type: 0,
        value: 'Sample Description'
      },
      {
        type: 5,
        value: 'Index 0',
        checked: false,
        indent: 0
      },
      {
        type: 5,
        value: 'Indent 1',
        checked: false,
        indent: 1
      },
      {
        type: 5,
        value: 'Indent 2',
        checked: true,
        indent: 2
      },
      {
        type: 6,
        lang: 'cpp',
        value: 'constexpr std::tuple<int, std::string> status{404, "Not Found"};'
      }
    ],
    true
  ),
  dev_createDocument('SoR Bank', [{ type: 0, value: 'Next Project' }])
];

export function dev_createDocument(
  title: string,
  contents: DocumentContent[],
  pinned?: boolean
): IDocument {
  return {
    title,
    contents,
    dateCreated: Date.now(),
    lastModified: Date.now() - 1_000 * 60 * 60,
    pinned: !!pinned
  };
}
