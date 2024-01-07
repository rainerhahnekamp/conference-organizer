import { signalStore, withComputed, withState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';
import { initialValue } from '@app/talks/models';

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
