import { Component } from '@angular/core';

@Component({
  selector: 'todo-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
})
export class BaseComponent {
  protected showSnackbar = false;
  protected snackbarMessage?: { message: string; error?: boolean };

  protected showSnackbarMessage(content: {
    message: string;
    error?: boolean;
  }): void {
    this.showSnackbar = true;
    this.snackbarMessage = content;
  }
}
