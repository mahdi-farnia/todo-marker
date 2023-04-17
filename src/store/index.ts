import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import editorSlice from './editor.slice';
import todosSlice from './todos.slice';

export const reduxStore = configureStore({
  devTools: true,
  reducer: {
    editor: editorSlice,
    todos: todosSlice
  }
});

type RootState = ReturnType<typeof reduxStore.getState>;
type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
