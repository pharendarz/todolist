import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '@components/base/base.component';
import { ListFilter } from '@enums/list-filter.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services/local-storage.service';
import { SearchTextService } from '@services/search-text.service';
import { hideEmptyTodos, showEmptyTodos } from '@store/list.actions';

@Component({
  selector: 'todo-filter',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent extends BaseComponent implements OnInit {
  @ViewChild('filterMenu', { static: false }) filterMenu!: ElementRef;

  protected faFilter = faFilter;
  protected isSubMenuOpen = false;
  protected hideEmpty = false;
  protected listFilter = ListFilter;
  protected currentFilter?: ListFilter;

  protected searchText = '';

  @HostListener('document:click', ['$event.target'])
  protected onClickOutside(target: HTMLElement) {
    // Close menu if the click is outside of the sub-menu container
    if (this.filterMenu && !this.filterMenu.nativeElement.contains(target)) {
      this.isSubMenuOpen = false;
    }
  }

  constructor(
    private readonly lss: LocalStorageService,
    private store: Store,
    private searchTextService: SearchTextService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.checkScreenSize();

    // Load filters from lss
    const filterValue = this.lss.getItem('listFilter');
    const searchValue = this.lss.getItem('listSearch');

    if (filterValue) {
      this.currentFilter = JSON.parse(filterValue).value;
    }
    if (searchValue) {
      this.searchText = JSON.parse(searchValue).value;
      this.searchTextService.setSearchText(this.searchText);
    }
  }

  set localStorageItem(lssItem: { key: string; value: string }) {
    this.lss.setItem(
      lssItem.key,
      JSON.stringify({
        value: lssItem.value,
      }),
    );
  }

  protected onFilterClick(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  protected onSearchChange(value: string): void {
    this.localStorageItem = {
      key: 'listSearch',
      value,
    };
    this.searchTextService.setSearchText(this.searchText);
  }

  protected onHideEmpty(): void {
    this.isSubMenuOpen = false;
    this.currentFilter = ListFilter.HideEmpty;

    this.localStorageItem = {
      key: 'listFilter',
      value: ListFilter.HideEmpty,
    };

    this.store.dispatch(hideEmptyTodos());
  }

  protected onShowAll(): void {
    this.isSubMenuOpen = false;
    this.searchText = '';

    this.lss.removeItem('listSearch');

    this.currentFilter = ListFilter.ShowAll;

    this.localStorageItem = {
      key: 'listFilter',
      value: ListFilter.ShowAll,
    };

    this.store.dispatch(showEmptyTodos());
    this.searchTextService.setSearchText(this.searchText);
  }
}
