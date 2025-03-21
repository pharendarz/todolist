import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from '@services/counter.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('mobileMenu', { static: false }) mobileMenu!: ElementRef;
  @ViewChild('menuButton') menuButton!: ElementRef;

  protected faGhost = faGhost;
  protected isOpen = false;

  constructor(protected readonly counterService: CounterService) {}

  @HostListener('document:click', ['$event.target'])
  protected onClickOutside(event: HTMLElement): void {
    if (
      this.menuButton?.nativeElement.contains(event) ||
      this.mobileMenu?.nativeElement.contains(event)
    ) {
      return;
    }

    this.isOpen = false;
  }

  protected toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
