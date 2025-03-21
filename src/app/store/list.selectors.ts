import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodosState } from '@store/list.reducer';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => state.list,
);
