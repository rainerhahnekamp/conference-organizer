import { computed, inject, Injectable } from '@angular/core';
import { Talk } from '@app/talks/talk';
import { talks } from '@app/talks/talks.data';
import {
  delay,
  interval,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';
import { tap } from 'rxjs/operators';
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
    this.#findAll().subscribe((talkData) => {
      const { lastUpdated } = this.#talkData().meta;
      if (lastUpdated !== talkData.meta.lastUpdated) {
        this.#talkData.update((value) => ({ ...value, ...talkData }));
      } else {
        this.#talkData.update((value) => ({
          ...value,
          meta: { ...value.meta, lastRefreshed: new Date() },
        }));
      }
    });
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
        .pipe(startWith(true))
        .subscribe(() => this.load());
      this.#talkData.update((value) => ({ ...value, isPolling: true }));
    }
  }

  find(id: number): Observable<Talk | undefined> {
    return of(talks.find((talk) => talk.id === id)).pipe(delay(0));
  }
}
