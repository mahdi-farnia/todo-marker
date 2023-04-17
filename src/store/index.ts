import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import editorSlice from './editor.slice';
import documentsSlice from './documents.slice';

export const reduxStore = configureStore({
  devTools: true,
  reducer: {
    editor: editorSlice,
    documents: documentsSlice
  }
});

type RootState = ReturnType<typeof reduxStore.getState>;
type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
