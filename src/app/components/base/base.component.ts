import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Error } from '@models/error.model';
import { Subject } from 'rxjs';

@Directive({
  selector: 'todo-base',
  standalone: true,
})
export class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  protected showSnackbar = false;
  protected snackbarMessage?: { message: string; error?: boolean };
  protected isMobile: boolean = false;

  protected showSnackbarMessage(content: {
    message: string;
    error?: boolean;
  }): void {
    this.showSnackbar = true;
    this.snackbarMessage = content;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  protected checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  protected constructErrorMessage(error: Error): string {
    return `[${error?.status ?? 'No Status'}] ${error?.message ?? 'An error occurred'}`;
  }
}
