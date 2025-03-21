import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'todo-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('snackbarAnimation', [
      transition(':enter', [
        style({ bottom: '-100px', opacity: 0 }),
        animate('300ms ease-out', style({ bottom: '20px', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ bottom: '-100px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CustomSnackbarComponent {
  @Input() content?: { message: string; error?: boolean };
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
