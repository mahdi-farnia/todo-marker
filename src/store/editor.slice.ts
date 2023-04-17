import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IEditorState {
  /** numbers less than zero indicate no editor, index of editors */
  activeEditorIndex: number;
  /** Unique array of document index */
  openedEditors: number[];
}

const initialState: IEditorState = { activeEditorIndex: -1, openedEditors: [] };

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    openEditor(state, { payload: dataIndex }: PayloadAction<number>) {
      let currentIndex = state.openedEditors.indexOf(dataIndex);

      if (currentIndex < 0) {
        currentIndex = state.openedEditors.push(dataIndex) - 1;
      }

      state.activeEditorIndex = currentIndex;
    },
    closeEditor(state, { payload: editorTabIndex }: PayloadAction<number>) {
      state.openedEditors.splice(editorTabIndex, 1);

      // Close when all closed
      if (state.openedEditors.length === 0) {
        state.activeEditorIndex = -1;
        return;
      }

      // Stay in the current opened editor
      if (state.activeEditorIndex !== editorTabIndex) {
        if (editorTabIndex < state.activeEditorIndex) {
          --state.activeEditorIndex; // shift everything to left
        }
        return;
      }

      // Try to open previously opened tab, if there isn't, open next
      state.activeEditorIndex = editorTabIndex === 0 ? editorTabIndex : editorTabIndex - 1;
    }
  }
});

export const { closeEditor, openEditor } = editorSlice.actions;

export default editorSlice.reducer;
