import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todo-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
