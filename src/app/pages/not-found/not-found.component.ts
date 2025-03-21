import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
