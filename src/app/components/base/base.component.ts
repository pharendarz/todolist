import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'todo-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  protected showSnackbar = false;
  protected snackbarMessage?: { message: string; error?: boolean };

  protected showSnackbarMessage(content: {
    message: string;
    error?: boolean;
  }): void {
    this.showSnackbar = true;
    this.snackbarMessage = content;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
