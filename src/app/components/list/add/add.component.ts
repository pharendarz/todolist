import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../../models/todo.model';
import { Store } from '@ngrx/store';
import { addTodo } from '../../../store/list.actions';
import { dateFormatValidator } from '../../../tools/custom-form-validators/date-format-validator';
import { CounterService } from '../../../services/counter.service';
import { BaseComponent } from '../../base/base.component';
@Component({
  selector: 'todo-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddComponent extends BaseComponent {
  protected form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly counterService: CounterService,
  ) {
    super();
    this.form = this.formBuilder.group({
      date: [
        { value: '2025-04-11', disabled: false },
        [Validators.required, dateFormatValidator()],
      ],
      location: [{ value: '', disabled: false }, Validators.required],
      content: [{ value: '', disabled: false }, Validators.required],
      display: { value: true, disabled: false },
    });
  }

  protected onSubmit(): void {
    const newTodo: Todo = this.form.value;

    this.store.dispatch(addTodo({ todo: newTodo }));

    this.counterService.setCounter();

    this.showSnackbarMessage({ message: 'Todo added successfully' });

    this.form.reset();
  }
}
