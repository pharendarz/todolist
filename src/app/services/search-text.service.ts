import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTextService {
  private searchTextSubject = new BehaviorSubject<string>('');
  public searchText$ = this.searchTextSubject.asObservable();

  setSearchText(value: string): void {
    this.searchTextSubject.next(value);
  }
}
