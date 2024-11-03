import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RecieveFinanzenService } from './recieve-finanzen.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pmf-frontend';

  finanzenService = inject(RecieveFinanzenService);

  einnahmenList = signal<Einnahmen[]>([]);
  ausgabenList = signal<Ausgaben[]>([]);

  ngOnInit() {
    this.finanzenService.getEinnahmen().subscribe((data) => {
      this.einnahmenList.update((values) => {
        return (values = data);
      });
    });

    this.finanzenService.getEinnahmen().subscribe((data) => {
      this.einnahmenList.update((values) => {
        return (values = data);
      });
    });
  }
}
