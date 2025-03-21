import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
