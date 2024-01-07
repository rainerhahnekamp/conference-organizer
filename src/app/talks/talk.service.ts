import { computed, inject, Injectable, signal } from '@angular/core';
import { Talk } from '@app/talks/models';
import { talks } from '@app/talks/talks.data';
import { delay, interval, Observable, of, startWith, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toPrettySchedule } from '@app/talks/to-pretty-schedule';
import { initialValue, TalkData } from '@app/talks/models';

@Injectable({ providedIn: 'root' })
export class TalkService {
  #talkData = signal(initialValue);
  #httpClient = inject(HttpClient);

  get talkData() {
    return this.#talkData.asReadonly();
  }

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

  talks = computed(() => this.#talkData().talks);

  dataSource = computed(() =>
    this.talks().map((talk) => ({
      id: talk.id,
      title: talk.title,
      speakers: talk.speakers,
      schedule: toPrettySchedule(talk),
      room: talk.room,
    })),
  );

  pollingSub: Subscription | undefined;

  togglePolling(intervalInSeconds = 30) {
    if (this.#talkData().isPolling) {
      this.pollingSub?.unsubscribe();
      this.#talkData.update((value) => ({ ...value, isPolling: false }));
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
