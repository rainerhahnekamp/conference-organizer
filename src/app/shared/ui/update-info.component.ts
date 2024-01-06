import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-info',
  template: ` <div>
    <p>
      Last updated: {{ updateData.lastUpdated | date: 'dd.MM.yyyy HH:mm' }} by
      {{ updateData.lastEditor }}
    </p>
    <p>
      Last refreshed: {{ updateData.lastRefreshed | date: 'dd.MM.yyyy HH:mm' }}
    </p>
  </div>`,
  standalone: true,
  imports: [DatePipe],
})
export class UpdateInfoComponent {
  @Input({ required: true }) updateData!: {
    lastUpdated: Date;
    lastRefreshed: Date;
    lastEditor: string;
  };
}
