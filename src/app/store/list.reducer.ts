import { createReducer, on } from '@ngrx/store';
import { Todo } from '@models/todo.model';
import { addTodo, hideEmptyTodos, showEmptyTodos } from '@store/list.actions';
import { initialState } from '@store/initial.list';

export interface TodosState {
  list: Todo[];
}

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
