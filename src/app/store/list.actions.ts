import { createAction, props } from '@ngrx/store';
import { Todo } from '@models/todo.model';

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>(),
);

export const loadTodos = createAction('[Todo List] Load Todos');
export const hideEmptyTodos = createAction('[Todo List] Hide Empty Todos');
export const showEmptyTodos = createAction('[Todo List] Show Empty Todos');
