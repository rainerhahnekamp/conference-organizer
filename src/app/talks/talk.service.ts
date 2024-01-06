import { inject, Injectable, signal } from '@angular/core';
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

export interface TalkData {
  talks: Talk[];
  meta: {
    lastUpdated: Date;
    lastEditor: string;
    lastRefreshed: Date;
  };
}

const initialValue = {
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
  #talkData = signal<TalkData & { isPolling: boolean }>(initialValue);
  #httpClient = inject(HttpClient);

  get talkData() {
    return this.#talkData.asReadonly();
  }

  #findAll(): Observable<TalkData> {
    return this.#httpClient.get<TalkData>('/talks');
  }

  load() {
    this.#findAll().subscribe((talkData) =>
      this.#talkData.update((value) => ({ ...value, ...talkData })),
    );
  }

  pollingSub: Subscription | undefined;

  togglePolling(intervalInSeconds = 30) {
    if (this.#talkData().isPolling) {
      this.pollingSub?.unsubscribe();
      this.#talkData.update((value) => ({ ...value, isPolling: false }));
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
        .subscribe((talkData) =>
          this.#talkData.update((value) => ({ ...value, ...talkData })),
        );
      this.#talkData.update((value) => ({ ...value, isPolling: true }));
    }
  }

  find(id: number): Observable<Talk | undefined> {
    return of(talks.find((talk) => talk.id === id)).pipe(delay(0));
  }
}
