import { LayoutModule } from './layout/layout.module';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
