import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';

@Component({
  selector: 'app-finance-summary',
  imports: [FinanceCardComponent],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css',
})
export class FinanceSummaryComponent implements OnInit {
  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  totalEinnahmen = signal<number>(0);
  totalAusgaben = signal<number>(0);
  balance = linkedSignal(() => this.totalEinnahmen() - this.totalAusgaben())


  ngOnInit(): void {
    this.einnahmenService.getTotalEinnahmen().subscribe((value) => {
      return this.totalEinnahmen.set(value);
    });

    this.ausgabenService.getTotalAusgaben().subscribe((value) => {
      return this.totalAusgaben.set(value);
    });

  }
}
