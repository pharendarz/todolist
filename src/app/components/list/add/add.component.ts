import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '@models/todo.model';
import { Store } from '@ngrx/store';
import { addTodo } from '@store/list.actions';
import { dateFormatValidator } from '@tools/custom-form-validators/date-format-validator';
import { CounterService } from '@services/counter.service';
import { BaseComponent } from '@components/base/base.component';
import { CustomSnackbarComponent } from '@components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'todo-add',
  templateUrl: './add.component.html',
  standalone: true,
  imports: [CustomSnackbarComponent, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent extends BaseComponent implements OnInit {
  protected form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly counterService: CounterService,
  ) {
    super();
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

  ngOnInit(): void {
    this.checkScreenSize();
  }

  protected onSubmit(): void {
    const newTodo: Todo = this.form.value;

    this.store.dispatch(addTodo({ todo: newTodo }));

    this.counterService.setCounter();

    this.showSnackbarMessage({ message: 'Todo added successfully' });

    this.form.reset();
  }
}
