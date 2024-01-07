import { computed, inject, Injectable } from '@angular/core';
import { Talk } from '@app/talks/talk';
import { talks } from '@app/talks/talks.data';
import {
  delay,
  distinctUntilChanged,
  interval,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';
import { TalkStore } from '@app/talks/talk-store';
import { patchState } from '@ngrx/signals';

export interface TalkData {
  talks: Talk[];
  meta: {
    lastUpdated: Date;
    lastEditor: string;
    lastRefreshed: Date;
  };
}

export interface TalkState extends TalkData {
  isPolling: boolean;
}

export const initialValue: TalkState = {
  isPolling: false,
  talks: [],
  meta: {
    lastUpdated: new Date(),
    lastEditor: '',
    lastRefreshed: new Date(),
  },
};

@Injectable({ providedIn: 'root' })
export class TalkService {
  talkStore = inject(TalkStore);
  #httpClient = inject(HttpClient);

  #findAll(): Observable<TalkData> {
    return this.#httpClient.get<TalkData>('/talks');
  }

  load() {
    this.#findAll().subscribe((talkData) =>
      patchState(this.talkStore, talkData),
    );
  }

  dataSource = computed(() =>
    this.talkStore.talks().map((talk) => ({
      id: talk.id,
      title: talk.title,
      speakers: talk.speakers,
      schedule: toPrettySchedule(talk),
      room: talk.room,
    })),
  );

  pollingSub: Subscription | undefined;

  togglePolling(intervalInSeconds = 30) {
    if (this.talkStore.isPolling()) {
      this.pollingSub?.unsubscribe();
      patchState(this.talkStore, { isPolling: false });
    } else {
      this.pollingSub = interval(intervalInSeconds * 1000)
        .pipe(
          startWith(true),
          switchMap(() => this.#findAll()),
          tap(console.info),
          distinctUntilChanged(
            (previous, current) =>
              previous.meta.lastRefreshed === current.meta.lastRefreshed,
          ),
        )
        .subscribe((talkData) => patchState(this.talkStore, talkData));
      patchState(this.talkStore, { isPolling: true });
    }
  }

  find(id: number): Observable<Talk | undefined> {
    return of(talks.find((talk) => talk.id === id)).pipe(delay(0));
  }
}
