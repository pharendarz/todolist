import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  addTodo,
  hideEmptyTodos,
  showEmptyTodos,
} from '../../store/list.actions';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import { selectAllTodos } from '../../store/list.selectors';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ListFilter } from '../../enums/list-filter.enum';
import { DataTransferService } from '../../services/data-transfer.service';
import { WeatherResponseDto } from '../../models/dto/weather.response';
import { LocalStorageService } from '../../services/local-storage.service';
import { Value } from '../../enums/value.enum';
import { BaseComponent } from '../base/base.component';
import { CustomSnackbarComponent } from '../snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TemperatureColorPipe } from '../../pipes/temperature-color.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CustomSnackbarComponent,
    SpinnerComponent,
    CommonModule,
    TemperatureColorPipe,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class ListComponent extends BaseComponent implements OnInit {
  @ViewChild('filterMenu', { static: false }) filterMenu!: ElementRef;

  // todo move filter to separate component
  protected faFilter = faFilter;
  protected isSubMenuOpen = false;
  protected hideEmpty = false;
  protected listFilter = ListFilter;
  protected empty = Value.Empty;
  protected currentFilter?: ListFilter;

  private searchTextSubject = new BehaviorSubject<string>('');
  protected filteredTodos$: Observable<Todo[]>;

  protected searchText = '';

  protected isLoading = signal(true);

  constructor(
    private store: Store,
    private readonly dataTransferService: DataTransferService,
    private readonly lss: LocalStorageService,
  ) {
    super();
    this.filteredTodos$ = this.loadStore();
  }

  ngOnInit(): void {
    // Load filters from lss
    const filterValue = this.lss.getItem('listFilter');
    const searchValue = this.lss.getItem('listSearch');

    if (filterValue) {
      this.currentFilter = JSON.parse(filterValue).value;
    }
    if (searchValue) {
      this.searchText = JSON.parse(searchValue).value;
      this.searchTextSubject.next(this.searchText);
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

  @HostListener('document:click', ['$event.target'])
  protected onClickOutside(target: HTMLElement) {
    // Close menu if the click is outside of the sub-menu container
    if (this.filterMenu && !this.filterMenu.nativeElement.contains(target)) {
      this.isSubMenuOpen = false;
    }
  }

  private loadStore(): Observable<Todo[]> {
    return combineLatest([
      this.store.select(selectAllTodos),
      this.searchTextSubject.asObservable(),
    ]).pipe(
      // Wait briefly for the user to stop typing
      debounceTime(500),

      // Show spinner as soon as load starts
      tap(() => this.isLoading.set(true)),

      // 1) Filter todos by search text
      map(([todos, search]) => this.filterBySearch(todos, search)),

      // 2) Attempt geocoding & weather for the first filtered todo
      switchMap((filteredTodos) =>
        this.processGeocodeAndWeather(filteredTodos),
      ),

      // Hide spinner
      tap(() => this.isLoading.set(false)),

      // Fallback if something unexpected fails
      catchError((err) => {
        this.showSnackbarMessage({
          message: 'Error loading todos: ' + err,
          error: true,
        });
        this.isLoading.set(false);
        return of([]);
      }),
      shareReplay(1),
    );
  }

  /** Filters only displayed todos and matches location to the search text */
  private filterBySearch(allTodos: Todo[], search: string): Todo[] {
    const displayed = allTodos.filter((todo) => todo.display);
    return displayed.filter((todo) =>
      todo.location?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  /**
   Looks up geocoding for the first todo in the list,
   then fetches weather if available.
   */
  private processGeocodeAndWeather(todos: Todo[]): Observable<Todo[]> {
    const firstTodo = todos[0];
    if (!firstTodo) {
      return of(todos);
    }

    return this.dataTransferService
      .getGeocodingLongLat(firstTodo.location)
      .pipe(
        switchMap((geoData) => {
          const loc = geoData?.results?.[0];
          if (!loc) {
            return of(todos);
          }
          return this.dataTransferService
            .getWeather(loc.longitude, loc.latitude)
            .pipe(
              map((weatherData) => {
                const updatedFirst: Todo = {
                  ...firstTodo,
                  long: loc.longitude,
                  lat: loc.latitude,
                  temperature: this.extractWeatherData(weatherData),
                };
                // Replace only the first todo in the result
                return [updatedFirst, ...todos.slice(1)];
              }),
              catchError((err) => {
                this.showSnackbarMessage({
                  message: 'Weather fetch failed: ' + err,
                  error: true,
                });
                return of(todos);
              }), // Return original todos if weather fails
            );
        }),
        catchError((err) => {
          this.showSnackbarMessage({
            message: 'Geocoding fetch failed: ' + err,
            error: true,
          });
          return of(todos);
        }), // Return original todos if geocoding fails
      );
  }

  private extractWeatherData(weatherData: WeatherResponseDto | null): string {
    const temperature = weatherData?.current?.temperature_2m;
    const temperatureUnit = weatherData?.current_units?.temperature_2m;
    if (!temperature || !temperatureUnit) {
      return 'N/A';
    }
    return `${temperature} ${temperatureUnit}`;
  }

  protected onAddTodo(newTodo: Todo): void {
    this.store.dispatch(addTodo({ todo: newTodo }));
  }

  protected onFilterClick(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  protected onSearchChange(value: string): void {
    this.localStorageItem = {
      key: 'listSearch',
      value,
    };
    this.searchTextSubject.next(value);
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
    this.searchTextSubject.next(this.searchText);
  }
}
