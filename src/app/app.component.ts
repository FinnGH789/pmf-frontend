import { Component, inject } from '@angular/core';
import { RecieveFinanzenService } from './recieve-finanzen.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pmf-frontend';

  finanzenService = inject(RecieveFinanzenService);

  constructor() {
    this.finanzenService.getEinnahmen();
    this.finanzenService.getAusgaben();
  }
}
