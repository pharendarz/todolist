import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/list/add/add.component';

export const routes: Routes = [
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
        component: AddComponent,
      },
    ],
  },
];
// can activate? todo
// 404 page / todo
