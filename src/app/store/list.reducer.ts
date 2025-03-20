import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { addTodo, hideEmptyTodos, showEmptyTodos } from './list.actions';
import { initialState } from './initial.list';

export interface TodosState {
  list: Todo[];
}
// todo fix dates to be in the same format with date-helper

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
