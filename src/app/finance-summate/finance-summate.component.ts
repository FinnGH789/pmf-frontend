import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';

@Component({
  selector: 'app-finance-summate',
  imports: [FormsModule],
  templateUrl: './finance-summate.component.html',
  styleUrl: './finance-summate.component.css',
})
export class FinanceSummateComponent {

  icon = input<string>('');
  caption = input<string>('');
  label = input<string>('');

  popUpCaption = input<string>('');
  popUpLabel = input<string>('');

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  openSummate = signal<boolean>(false)
  addAusgabenWindow: boolean = false;

  einnahme = new Einnahmen();
  ausgabe = new Ausgaben();

  addEinnahmen(einnahme: Einnahmen) {
    return this.einnahmenService.addEinnahme(einnahme).subscribe();
  }
  addAusgaben(ausgabe: Ausgaben) {
    return this.ausgabenService.addAusgabe(ausgabe).subscribe();
  }
}
