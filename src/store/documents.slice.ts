import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IDocument {
  title: string;
  content: string;
  dateCreated: number;
  lastModified: number;
  pinned: boolean;
}

// NOTE Dev Only
const initialState: IDocument[] = [
  dev_createDocument('Document Marker', true),
  dev_createDocument('SoR Bank')
];

// NOTE Dev Only
export function dev_createDocument(title: string, pinned?: boolean): IDocument {
  return {
    title,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ad. Quo voluptas id voluptatibus laudantium, modi nisi, qui quisquam odit ipsum rem, corrupti adipisci tempora error dolorum beatae delectus consequatur.',
    dateCreated: Date.now(),
    lastModified: Date.now() - 1_000 * 60 * 60,
    pinned: !!pinned
  };
}

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
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
