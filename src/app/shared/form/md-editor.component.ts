import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { remark } from 'remark';
import html from 'remark-html';

@Component({
  selector: 'app-md-editor',
  template: ` <div class="flex content-between mb-4">
    <textarea
      class="p-4 w-1/2"
      [ngModel]="markdown"
      (ngModelChange)="renderHtml($event)"
    ></textarea>
    <div class="w-1/2 p-4" [innerHTML]="preview"></div>
  </div>`,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdEditorComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
})
export class MdEditorComponent implements ControlValueAccessor {
  markdown = '';
  processor = remark().use(html);
  preview = '';
  isDisabled = false;

  renderHtml(markdown: string) {
    this.preview = this.processor.processSync(markdown).toString();
    console.log(this.preview);
  }

  onChange: (value: string) => void = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.markdown = value;
    this.renderHtml(this.markdown);
  }
}
