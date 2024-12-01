import {
  Component,
  inject,
  linkedSignal,
  OnInit,
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
  balance = linkedSignal(() => this.totalEinnahmen() - this.totalAusgaben());

  addEinnahmenWindow: boolean = false;

  ausgabe: Ausgaben = {
    id: '1',
    name: 'Miete',
    ausgaben: '1200',
  };

  test: Einnahmen = {
    id: '',
    name: '',
    einnahme: '',
  };

  ngOnInit(): void {
    this.einnahmenService.getTotalEinnahmen().subscribe((value) => {
      return this.totalEinnahmen.set(value);
    });

    this.ausgabenService.getTotalAusgaben().subscribe((value) => {
      return this.totalAusgaben.set(value);
    });
  }

  addEinnahmen(test: Einnahmen) {
    return this.einnahmenService.addEinnahme(test).subscribe();
  }
}
