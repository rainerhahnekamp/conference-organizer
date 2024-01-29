import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';
import { initialValue, Talk, TalkData } from '@app/talks/models';
import { HttpClient } from '@angular/common/http';
import {
  delay,
  interval,
  map,
  Observable,
  of,
  pipe,
  startWith,
  switchMap,
  Unsubscribable,
} from 'rxjs';
import { talks } from '@app/talks/talks.data';
import { tap } from 'rxjs/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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
      selectedTalk: computed(() => {
        const selectedId = store.selectedId();
        const talks = store.talks();

        return talks.find((talk) => talk.id === selectedId);
      }),
    };
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);

    const findAll = (): Observable<TalkData> => {
      return httpClient.get<TalkData>('/talks');
    };

    let pollingSub: Unsubscribable | undefined;

    return {
      load: rxMethod<void>(
        pipe(
          switchMap(findAll),
          tap((talkData) => {
            const lastUpdated = store.meta.lastUpdated();
            if (lastUpdated !== talkData.meta.lastUpdated) {
              patchState(store, talkData);
            } else {
              patchState(store, (value) => ({
                meta: { ...value.meta, lastRefreshed: new Date() },
              }));
            }
          }),
        ),
      ),

      togglePolling(intervalInSeconds = 30) {
        if (store.isPolling()) {
          pollingSub?.unsubscribe();
          patchState(store, { isPolling: false });
        } else {
          pollingSub = this.load(
            interval(intervalInSeconds * 1000).pipe(
              startWith(0),
              map(() => void true),
            ),
          );
          patchState(store, { isPolling: true });
        }
      },

      find: rxMethod<number>(
        pipe(tap((selectedId) => patchState(store, { selectedId }))),
      ),

      update(talk: Talk) {
        patchState(store, ({ talks }) => ({
          talks: talks.map((entity) => (entity.id === talk.id ? talk : entity)),
        }));
      },
    };
  }),
);
