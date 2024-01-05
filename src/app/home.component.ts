import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  template: `<h2 data-testid="greeting">Conference Administration</h2> `,
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule],
})
export class HomeComponent {}
