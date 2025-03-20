import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../../models/todo.model';
import { Store } from '@ngrx/store';
import { addTodo } from '../../../store/list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dateFormatValidator } from '../../../tools/custom-form-validators/date-format-validator';
import { CounterService } from '../../../services/counter.service';
@Component({
  selector: 'todo-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar,
    private readonly counterService: CounterService,
  ) {
    this.form = this.formBuilder.group({
      date: [
        { value: '', disabled: false },
        [Validators.required, dateFormatValidator()],
      ],
      location: [{ value: '', disabled: false }, Validators.required],
      content: [{ value: '', disabled: false }, Validators.required],
      display: { value: true, disabled: false },
    });
  }

  protected onSubmit(): void {
    const newTodo: Todo = this.form.value;
    // newTodo.date = new Date().toISOString();
    this.store.dispatch(addTodo({ todo: newTodo }));
    console.warn('New todo:', newTodo);
    this.form.reset();
    this.counterService.setCounter();
    this.snackBar.open('Todo added!', 'Close', {
      duration: 3000,
    });
  }
}
