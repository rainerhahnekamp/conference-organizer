import { Component, computed, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UpdateInfoComponent } from '@app/shared/ui';
import { TalkStore } from '@app/talks/talk-store';

type ViewModel = {
  id: number;
  title: string;
  speakers: string;
  schedule: string;
  room: string;
};

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, UpdateInfoComponent],
})
export class TalksComponent {
  talkStore = inject(TalkStore);

  meta = computed(() => this.talkStore.meta());
  isPolling = computed(() => this.talkStore.isPolling());
  dataSource = computed(
    () => new MatTableDataSource<ViewModel>(this.talkStore.dataSource()),
  );

  constructor() {
    this.talkStore.load();
  }

  displayedColumns = ['title', 'speakers', 'room', 'schedule', 'actions'];

  togglePolling() {
    this.talkStore.togglePolling();
  }
}
