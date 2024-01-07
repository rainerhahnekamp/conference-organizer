import { Routes } from '@angular/router';
import { TalksComponent } from '@app/talks/talks/talks.component';
import { TalkDetailComponent } from '@app/talks/talk-detail/talk-detail.component';

const talksRoutes: Routes = [
  {
    path: '',
    component: TalksComponent,
  },
  { path: ':id', component: TalkDetailComponent },
];

export default talksRoutes;
