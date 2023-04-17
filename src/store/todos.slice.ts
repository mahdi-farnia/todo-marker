import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ITodo {
  title: string;
  content: string;
  dateCreated: number;
  lastModified: number;
}

// NOTE Dev Only
const initialState: ITodo[] = [dev_createTodo('Todo Marker'), dev_createTodo('SoR Bank')];

// NOTE Dev Only
export function dev_createTodo(title: string): ITodo {
  return {
    title,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ad. Quo voluptas id voluptatibus laudantium, modi nisi, qui quisquam odit ipsum rem, corrupti adipisci tempora error dolorum beatae delectus consequatur.',
    dateCreated: Date.now(),
    lastModified: Date.now() - 1_000 * 60 * 60
  };
}

const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, { payload: todo }: PayloadAction<ITodo>) {
      state.push(todo);
    },
    removeTodo(state, { payload: index }: PayloadAction<number>) {
      state.splice(index, 1);
    },
    mutateTodo(state, { payload: todo }: PayloadAction<Partial<ITodo> & { index: number }>) {
      const { index } = todo;

      Object.assign(state[index], todo);
    }
  }
});

export const { addTodo, removeTodo, mutateTodo } = todosSlice.actions;

export default todosSlice.reducer;
