import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { addTodo } from '../../store/list.actions';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import { selectAllTodos } from '../../store/list.selectors';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { DataTransferService } from '@services/data-transfer.service';
import { WeatherResponseDto } from '@models/dto/weather.response';
import { Value } from '@enums/value.enum';
import { BaseComponent } from '@components/base/base.component';
import { CustomSnackbarComponent } from '@components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { TemperatureColorPipe } from '@pipes/temperature-color.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterComponent } from './filter/filter.component';
import { SearchTextService } from '@services/search-text.service';

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
    FilterComponent,
  ],
})
export class ListComponent extends BaseComponent implements OnInit {
  protected empty = Value.Empty;
  protected filteredTodos$: Observable<Todo[]>;

  protected isLoading = signal(true);

  constructor(
    private store: Store,
    private readonly dataTransferService: DataTransferService,
    private searchTextService: SearchTextService,
  ) {
    super();
    this.filteredTodos$ = this.loadStore().pipe(takeUntil(this.destroy$));
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  private loadStore(): Observable<Todo[]> {
    const todos$ = this.store.select(selectAllTodos);
    const search$ = this.searchTextService.searchText$ || of('');
    return combineLatest([todos$, search$]).pipe(
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
                  message: 'Weather fetch failed: ' + err.message,
                  error: true,
                });
                return of(todos);
              }), // Return original todos if weather fails
            );
        }),
        catchError((err) => {
          this.showSnackbarMessage({
            message: 'Geocoding fetch failed: ' + err.message,
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
}
