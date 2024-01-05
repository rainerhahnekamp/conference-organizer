import { Injectable } from '@angular/core';
import { Talk } from '@app/talks/talk';
import { talks } from '@app/talks/talks.data';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface TalksResponse {
  talks: Talk[];
  lastUpdated: Date;
  lastEditor: string;
}

@Injectable({ providedIn: 'root' })
export class TalkService {
  findAll(): Observable<TalksResponse> {
    return of({
      talks,
      lastUpdated: new Date(),
      lastEditor: 'Rainer Hahnekamp',
    }).pipe(delay(1000));
  }
}
