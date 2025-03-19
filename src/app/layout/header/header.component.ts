import { Component } from '@angular/core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected faGhost = faGhost;
  protected isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
