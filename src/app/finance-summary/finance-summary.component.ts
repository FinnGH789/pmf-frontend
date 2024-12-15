import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-summary',
  imports: [FinanceCardComponent, FormsModule],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css',
})
export class FinanceSummaryComponent implements OnInit {

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  totalEinnahmen = signal<number>(0);
  totalAusgaben = signal<number>(0);
  cashBalance = computed(() => this.totalEinnahmen() - this.totalAusgaben());

  addEinnahmenWindow: boolean = false;
  addAusgabenWindow: boolean = false;

  einnahme = new Einnahmen();
  ausgabe = new Ausgaben()


  ngOnInit(): void {
    this.einnahmenService.getTotalEinnahmen().subscribe((value) => {
      return this.totalEinnahmen.set(value);
    });

    this.ausgabenService.getTotalAusgaben().subscribe((value) => {
      return this.totalAusgaben.set(value);
    });
  }

  addEinnahmen(einnahme: Einnahmen) {
    return this.einnahmenService.addEinnahme(einnahme).subscribe();
  }

  addAusgaben(ausgabe: Ausgaben) {
    return this.ausgabenService.addAusgabe(ausgabe).subscribe();
  }
}
