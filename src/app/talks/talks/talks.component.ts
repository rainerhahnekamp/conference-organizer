import { Component, computed, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TalkService } from '@app/talks/talk.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Talk } from '@app/talks/talk';

type ViewModel = {
  title: string;
  speakers: string;
  schedule: string;
  room: string;
};

function toPrettySchedule({ schedule }: Talk) {
  const start = schedule.day;
  start.setHours(schedule.startHour);
  start.setMinutes(schedule.startMinute);

  const end = new Date(start.getTime() + schedule.durationInMinutes * 3600);

  return `${start.toLocaleDateString()}: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
}

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
})
export class TalksComponent {
  talks = toSignal(inject(TalkService).findAll());

  dataSource = computed(() => {
    const response = this.talks();
    if (!response) {
      return new MatTableDataSource<ViewModel>([]);
    }

    return new MatTableDataSource<ViewModel>(
      response.talks.map((talk) => ({
        title: talk.title,
        speakers: talk.speakers.join(', '),
        schedule: toPrettySchedule(talk),
        room: talk.room,
      })),
    );
  });

  displayedColumns = ['title', 'speakers', 'room', 'schedule', 'actions'];
}
