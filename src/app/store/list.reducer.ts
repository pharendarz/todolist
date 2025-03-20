import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { addTodo, hideEmptyTodos, showEmptyTodos } from './list.actions';

export interface TodosState {
  list: Todo[];
}
// todo fix dates to be in the same format with date-helper

const initialState: TodosState = {
  list: [
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
    {
      date: '2025-11-11',
      location: 'Home',
      content: 'Do the laundry',
      display: true,
    },
    {
      date: '2020-01-02',
      location: 'Work',
      content: 'Prepare for meeting',
      display: true,
    },
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
    {
      date: new Date().toISOString(),
      location: 'School',
      content: 'Study for exam',
      display: true,
    },
    {
      date: new Date().toISOString(),
      location: 'Home',
      content: 'Cook dinner',
      display: false,
    },
    {
      date: new Date().toISOString(),
      location: 'Home',
      content: 'Cook dinner3',
      display: true,
    },
    {
      date: new Date().toISOString(), // today - convert in helper to unified date format
      location: 'Home',
      content: 'Cook dinner2',
      display: true,
    },
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
  ],
};
// on add todo, add the todo to the list
export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    list: [...state.list, todo],
  })),
  on(hideEmptyTodos, (state) => ({
    ...state,
    list: state.list.map((todo) =>
      !todo.date && !todo.location && !todo.content
        ? { ...todo, display: false }
        : todo,
    ),
  })),
  on(showEmptyTodos, (state) => ({
    ...state,
    list: state.list.map((todo) =>
      !todo.date && !todo.location && !todo.content
        ? { ...todo, display: true }
        : todo,
    ),
  })),
);
