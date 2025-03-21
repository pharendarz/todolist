// todo change components to directives where possible
// todo split components to smaller ones
// clean tailwind from unused classes p=text-grey-500
// todo add more tests
// go through all types and put them in separtate files
// todo clean github (set repos as private)
// todo add protected & readonly to all properties
// todo clean unused scss and scss url in component
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { todosReducer } from './store/list.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ todos: todosReducer }),
    importProvidersFrom([BrowserAnimationsModule]),
    provideHttpClient(withFetch()),
  ],
};
