import { signalStore, withState } from '@ngrx/signals';
import { initialValue } from '@app/talks/talk.service';

export const TalkStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
);
