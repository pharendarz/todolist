import { Component } from '@angular/core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected faGhost = faGhost;
  protected isOpen = false;

  constructor(protected readonly counterService: CounterService) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
