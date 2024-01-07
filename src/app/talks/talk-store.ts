import { signalStore, withState } from '@ngrx/signals';
import { initialValue } from '@app/talks/models';

export const TalkStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
);
