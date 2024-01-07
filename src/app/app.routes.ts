import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'talks',
        loadChildren: () => import('./talks/talks.routes'),
      },
    ],
  },
];
