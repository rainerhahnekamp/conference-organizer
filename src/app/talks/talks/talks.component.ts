import { Component, computed, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TalkService } from '@app/talks/talk.service';
import { UpdateInfoComponent } from '@app/shared/ui';

/**
 * 1. nested selector with meta
 * 2. patchState with selectedId
 * 3. computed with selectediId
 * 4. updateInterval
 * 5. extension local storage
 */

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
  talkService = inject(TalkService);

  talkData = this.talkService.talkData;

  meta = computed(() => this.talkData().meta);
  isPolling = computed(() => this.talkData().isPolling);
  dataSource = computed(
    () => new MatTableDataSource<ViewModel>(this.talkService.dataSource()),
  );

  constructor() {
    this.talkService.load();
  }

  displayedColumns = ['title', 'speakers', 'room', 'schedule', 'actions'];

  togglePolling() {
    this.talkService.togglePolling();
  }
}
