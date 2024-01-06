import { Component, computed, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Talk } from '@app/talks/talk';
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

function toPrettySchedule({ schedule }: Talk) {
  const start = schedule.date;
  start.setHours(schedule.startHour);
  start.setMinutes(schedule.startMinute);

  const end = new Date(start.getTime() + schedule.durationInMinutes * 3600);

  return `${start.toLocaleDateString()}: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
}

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

  constructor() {
    this.talkService.load();
  }

  dataSource = computed(() => {
    return new MatTableDataSource<ViewModel>(
      this.talkData().talks.map((talk) => ({
        id: talk.id,
        title: talk.title,
        speakers: talk.speakers,
        schedule: toPrettySchedule(talk),
        room: talk.room,
      })),
    );
  });

  displayedColumns = ['title', 'speakers', 'room', 'schedule', 'actions'];

  togglePolling() {}
}
