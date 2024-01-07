import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialValue } from '@app/talks/talk.service';
import { computed } from '@angular/core';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';

export const TalkStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => {
    return {
      dataSource: computed(() =>
        store.talks().map((talk) => ({
          id: talk.id,
          title: talk.title,
          speakers: talk.speakers,
          schedule: toPrettySchedule(talk),
          room: talk.room,
        })),
      ),
    };
  }),
);
