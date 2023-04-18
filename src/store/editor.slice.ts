import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IEditorState {
  tabs: {
    /** index of openedDocIndexes, negative number indicates closed editor */
    activeIndex: number;
    /** unique array of document index in db */
    openedDocIndexes: number[];
  };
  // TODO editor state
  // editor: { currentDocument: IDocument, all... }
}

const initialState: IEditorState = { tabs: { activeIndex: -1, openedDocIndexes: [] } };

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    openEditor(state, { payload: docIndex }: PayloadAction<number>) {
      let currentIndex = state.tabs.openedDocIndexes.indexOf(docIndex);

      if (currentIndex < 0) {
        currentIndex = state.tabs.openedDocIndexes.push(docIndex) - 1;
      }

      state.tabs.activeIndex = currentIndex;
    },
    closeEditor(state, { payload: closedTabIndex }: PayloadAction<number>) {
      state.tabs.openedDocIndexes.splice(closedTabIndex, 1);

      // Close when all closed
      if (state.tabs.openedDocIndexes.length === 0) {
        state.tabs.activeIndex = -1;
        return;
      }

      // Stay in the current opened editor
      if (state.tabs.activeIndex !== closedTabIndex) {
        if (closedTabIndex < state.tabs.activeIndex) {
          --state.tabs.activeIndex; // shift everything to left
        }
        return;
      }

      // Try to open previously opened tab, if there isn't, open next
      state.tabs.activeIndex = closedTabIndex === 0 ? closedTabIndex : closedTabIndex - 1;
    }
  }
});

export const { closeEditor, openEditor } = editorSlice.actions;

export default editorSlice.reducer;
