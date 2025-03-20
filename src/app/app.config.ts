// todo additionaly - provide linter to the project
// todo additionaly - provide unit tests to the project
// todo create @imports for the project
// todo erase all dead imports
// todo make linter to check if method return type is correct
// todo split components to smaller ones
// todo handle errors
// clean tailwind from unused classes p=text-grey-500
// todo add more tests
// todo create base component with ngDestroy
// go through all types and put them in separtate files
// todo refactor modules
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
