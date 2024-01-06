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
        loadComponent: () =>
          import('./talks/talks/talks.component').then((t) => t.TalksComponent),
      },
      {
        path: 'talks/:id',
        loadComponent: () =>
          import('./talks/talk-detail/talk-detail.component').then(
            (t) => t.TalkDetailComponent,
          ),
      },
    ],
  },
];
