import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/list/add/add.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HeaderComponent, // todo change to LayoutComponent - create one to be more generic
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/list/add/add.component').then(
            (m) => m.AddComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
// can activate? todo
// 404 page / todo
