import { Component, OnInit, signal } from '@angular/core';
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
  switchMap,
  tap,
} from 'rxjs';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ListFilter } from '../../enums/list-filter.enum';
import { DataTransferService } from '../../services/data-transfer.service';
import { WeatherResponseDto } from '../../models/dto/weather.response';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  // todo move filter to separate component
  protected faFilter = faFilter;
  protected isSubMenuOpen = false;
  protected hideEmpty = false;
  protected listFilter = ListFilter;
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

  private loadStore() {
    return combineLatest([
      this.store.select(selectAllTodos),
      this.searchTextSubject.asObservable(),
    ]).pipe(
      debounceTime(500),
      // Filter by search text
      map(([todos, search]) => {
        // Show loading spinner
        this.isLoading.set(true);

        const displayed = todos.filter((todo) => todo.display);
        return displayed.filter((todo) =>
          todo.location?.toLowerCase().includes(search.toLowerCase()),
        );
      }),
      // Then run geocoding on the first filtered todo
      switchMap((todos) => {
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
                // No location found, just return todos
                return of(todos);
              }
              // If location found, fetch weather
              return this.dataTransferService
                .getWeather(loc.longitude, loc.latitude)
                .pipe(
                  map((weatherData) => {
                    const updatedFirst = {
                      ...firstTodo,
                      long: loc.longitude,
                      lat: loc.latitude,
                      temperature: this.extractWeatherData(weatherData),
                    };
                    // Replace only the first todo
                    return [updatedFirst, ...todos.slice(1)];
                  }),
                  catchError(() => {
                    // On error, just return the original todos
                    return of(todos);
                  }),
                );
            }),
            catchError(() => of(todos)),
          );
      }),
      tap(() => {
        // Hide loading spinner
        this.isLoading.set(false);
      }),
    );
  }

  private extractWeatherData(weatherData: WeatherResponseDto): string {
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
