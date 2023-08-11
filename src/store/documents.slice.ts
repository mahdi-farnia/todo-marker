import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dev_DocumentInitialState } from './dev_seedDocuments';

export const enum DocumentContentType {
  BasicString = 0,
  H2 = 1,
  H3 = 2,
  H4 = 3,
  H5 = 4,
  CheckBox = 5,
  CodeBlock = 6
}

export interface IBasicDocumentContent {
  type: DocumentContentType;
  value: string;
}

export interface IDocumentSimpleTextOnlyContent extends IBasicDocumentContent {
  type:
    | DocumentContentType.BasicString
    | DocumentContentType.H2
    | DocumentContentType.H3
    | DocumentContentType.H4
    | DocumentContentType.H5;
}

export interface IDocumentCheckBoxContent extends IBasicDocumentContent {
  type: DocumentContentType.CheckBox;
  checked: boolean;
  indent: number;
}

export interface IDocumentCodeBlockContent extends IBasicDocumentContent {
  type: DocumentContentType.CodeBlock;
  lang: string;
}

export type DocumentContent =
  | IDocumentSimpleTextOnlyContent
  | IDocumentCheckBoxContent
  | IDocumentCodeBlockContent;

export interface IDocument {
  title: string;
  contents: DocumentContent[];
  dateCreated: number;
  lastModified: number;
  pinned: boolean;
}

/**
 * // NOTE For Future
 * set initial state to only the current document
 * put actions like:
 * dispose(void) -> clear current state -> no editor is active
 * switchDocumentTo(index: number) -> index is the corresponding index in the DB
 * mutateDocument(doc) -> mutate the current state
 * saveDocument(void) -> save using localforage to DB
 */

const documentsSlice = createSlice({
  name: 'documents',
  // @ts-ignore
  initialState: dev_DocumentInitialState,
  reducers: {
    addDocument(state, { payload: doc }: PayloadAction<IDocument>) {
      state.push(doc);
    },
    removeDocument(state, { payload: index }: PayloadAction<number>) {
      state.splice(index, 1);
    },
    mutateDocument(state, { payload: doc }: PayloadAction<Partial<IDocument> & { index: number }>) {
      const { index } = doc;
      console.assert(
        Reflect.deleteProperty(doc, 'index'),
        'could not delete index property from mutated document state object!'
      );

      Object.assign(state[index], doc);
    }
  }
});

export const { addDocument, removeDocument, mutateDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
