import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { selectAllTodos } from '../store/list.selectors';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private counter = new BehaviorSubject<number>(0);

  constructor(private store: Store) {
    this.setCounter();
  }

  private filterTodayOrFutureTodos(todos: Todo[]): Todo[] {
    const today = new Date();

    return todos.filter((todo) => {
      if (!todo.date) return false;

      const todoDate = new Date(todo.date);

      return todoDate >= today && todo.display;
    });
  }

  public getCounter() {
    return this.counter.asObservable();
  }

  public setCounter() {
    // Subscribe to todos from the store
    this.store.select(selectAllTodos).subscribe((todos) => {
      // Filter todos where date is today or in the future
      const todayOrFutureTodos = this.filterTodayOrFutureTodos(todos);
      // Update the counter with the count
      this.counter.next(todayOrFutureTodos.length);
    });
  }
}
