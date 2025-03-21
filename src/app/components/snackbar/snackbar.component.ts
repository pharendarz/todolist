import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSnackbarComponent {
  @Input() content?: { message: string; error?: boolean };
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
