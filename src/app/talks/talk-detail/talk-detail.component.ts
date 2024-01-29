import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { Talk } from '@app/talks/models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MdEditorComponent } from '@app/shared/form/md-editor.component';
import { TalkStore } from '@app/talks/talk-store';

const emptyTalk: Talk = {
  id: 0,
  title: '',
  abstract: '',
  room: '',
  speakers: '',
  schedule: {
    date: new Date(),
    startHour: 0,
    startMinute: 0,
    durationInMinutes: 0,
  },
};

/**
 * 1. nested selectors for editor
 * 2. patchState from editor
 * 2. rxMethod for multiple updates coming from editor
 *
 * 1. extension localStorage
 */

@Component({
  selector: 'app-talk-detail',
  templateUrl: './talk-detail.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerModule,
    MdEditorComponent,
  ],
})
export class TalkDetailComponent {
  id = input.required({ transform: numberAttribute });

  talkStore = inject(TalkStore);

  fb = inject(FormBuilder);
  formGroup = this.fb.nonNullable.group({
    id: [0],
    title: ['', Validators.required],
    abstract: ['', Validators.required],
    room: ['', Validators.required],
    speakers: [''],
    schedule: this.fb.nonNullable.group({
      date: [new Date()],
      startHour: [0],
      startMinute: [0],
      durationInMinutes: [0],
    }),
  });

  constructor() {
    this.talkStore.find(this.id);
    effect(() => {
      const talk = this.talkStore.selectedTalk();
      if (talk) {
        this.formGroup.setValue(talk);
      }
    });
  }

  get schedule() {
    return this.formGroup.get('schedule') as FormGroup;
  }

  submit() {
    this.talkStore.update(this.formGroup.getRawValue());
  }
}
