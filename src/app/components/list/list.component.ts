import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  addTodo,
  hideEmptyTodos,
  showEmptyTodos,
} from '../../store/list.actions';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import { selectAllTodos } from '../../store/list.selectors';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
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

  protected todos$: Observable<Todo[]>;

  protected searchText = '';

  constructor(
    private store: Store,
    private readonly dataTransferService: DataTransferService,
    private readonly lss: LocalStorageService,
  ) {
    this.todos$ = this.loadStore();
  }

  ngOnInit(): void {
    // load filters from lss
    const filterValue = this.lss.getItem('listFilter');
    const searchValue = this.lss.getItem('listSearch');

    if (filterValue) {
      this.currentFilter = JSON.parse(filterValue).value;
    }
    if (searchValue) {
      this.searchText = JSON.parse(searchValue).value;
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

  private loadStore(): Observable<Todo[]> {
    return this.store.select(selectAllTodos).pipe(
      map((todos: Todo[]) => todos.filter((todo) => todo.display)),
      // Chain the geocoding request
      switchMap((todos: Todo[]) => {
        const firstTodo = todos[0];
        // If there's no todo, return the todos as is
        if (!firstTodo) {
          return of(todos);
        }
        return this.dataTransferService
          .getGeocodingLongLat(firstTodo.location)
          .pipe(
            // Chain the weather request using the geocoding result
            switchMap((geoData) => {
              if (geoData && !geoData.results) {
                return of(todos);
              }
              const location = geoData?.results[0];
              // If there's no location, return the todos as is
              if (!location) {
                return of(todos);
              }
              return this.dataTransferService
                .getWeather(location.longitude, location.latitude)
                .pipe(
                  map((weatherData, i) => {
                    // throw new Error('dummy error');
                    // If there's at least one todo, map it with longitude, latitude, temperature
                    if (todos.length > 0 && i === 0) {
                      const updatedFirstTodo: Todo = {
                        ...todos[0],
                        long: location.longitude,
                        lat: location.latitude,
                        temperature: this.extractWeatherData(weatherData),
                      };
                      return [updatedFirstTodo, ...todos.slice(1)];
                    }
                    return todos;
                  }),
                );
            }),
            catchError((err) => {
              console.error(err);
              return of(todos);
            }),
          );
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
  }
}
